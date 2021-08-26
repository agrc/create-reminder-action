const issueContext = require('./issue_comment_payload.json');
const { getReminder, addReminderToBody } = require('./utilities');

describe('getReminder', () => {
  test('can parse context', () => {
    const REFERENCE_DATE = new Date(2017, 6, 5, 4, 3, 2, 0);
    const reminder = getReminder(issueContext, REFERENCE_DATE);

    expect(reminder).toEqual({
      who: 'Codertocat',
      when: new Date(2017, 6, 6, 9, 0, 0, 0),
      what: 'do something',
    });
  });
  test('returns null if not a slash command', () => {
    const reminder = getReminder({
      ...issueContext,
      comment: {
        body: 'not a command',
      },
    });

    expect(reminder).toBeNull();
  });
  test('returns null if the command is not remind', () => {
    const reminder = getReminder({
      ...issueContext,
      comment: {
        body: '/not a command',
      },
    });

    expect(reminder).toBeNull();
  });
  test('can parse multiline comments', () => {
    const REFERENCE_DATE = new Date(2017, 6, 5, 4, 3, 2, 0);
    const reminder = getReminder({
      ...issueContext,
      comment: {
        body: "This is a test\r\n/remind me to do this in one day\r\nwith some text"
      }
    }, REFERENCE_DATE);

    expect(reminder).toEqual({
      who: 'Codertocat', when: new Date(2017, 6, 6, 9, 0, 0, 0), what: 'do this'
    });
  });
  test('can parse reminder within line', () => {
    const REFERENCE_DATE = new Date(2017, 6, 5, 4, 3, 2, 0);
    const reminder = getReminder({
      ...issueContext,
      comment: {
        body: "This is a test: /remind me to do this in one day"
      }
    }, REFERENCE_DATE);

    expect(reminder).toEqual({
      who: 'Codertocat', when: new Date(2017, 6, 6, 9, 0, 0, 0), what: 'do this'
    });
  });
  test('skips reminder in quote', () => {
    const REFERENCE_DATE = new Date(2017, 6, 5, 4, 3, 2, 0);
    const reminder = getReminder({
      ...issueContext,
      comment: {
        body: "This is a test\r\n> with some text\r\n> /remind me to do this in one day"
      }
    }, REFERENCE_DATE);

    expect(reminder).toBeNull();
  });
  test('skips reminder in code block', () => {
    const REFERENCE_DATE = new Date(2017, 6, 5, 4, 3, 2, 0);
    const reminder = getReminder({
      ...issueContext,
      comment: {
        body: "This is a test\r\n```\r\n/remind me to do this in one day\r\n```"
      }
    }, REFERENCE_DATE);

    expect(reminder).toBeNull();
  });
  test('skips reminder in code block 2', () => {
    const REFERENCE_DATE = new Date(2017, 6, 5, 4, 3, 2, 0);
    const reminder = getReminder({
      ...issueContext,
      comment: {
        body: "This is a test\r\n```python\r\n/remind me to do this in one day\r\n```"
      }
    }, REFERENCE_DATE);

    expect(reminder).toBeNull();
  });
  test('skips reminder in inline code', () => {
    const REFERENCE_DATE = new Date(2017, 6, 5, 4, 3, 2, 0);
    const reminder = getReminder({
      ...issueContext,
      comment: {
        body: "This is a test: `/remind me to do this in one day`"
      }
    }, REFERENCE_DATE);

    expect(reminder).toBeNull();
  });
  test('works again after code block', () => {
    const REFERENCE_DATE = new Date(2017, 6, 5, 4, 3, 2, 0);
    const reminder = getReminder({
      ...issueContext,
      comment: {
        body: "This is a test\r\n```\r\ncode here!\r\n```\r\n/remind me to do this in one day"
      }
    }, REFERENCE_DATE);

    expect(reminder).toEqual({
      who: 'Codertocat', when: new Date(2017, 6, 6, 9, 0, 0, 0), what: 'do this'
    });
  });
});

describe('addReminderToBody', () => {
  test('adds a reminder to an issue body', () => {
    const reminder = {
      who: '@hello',
      what: 'do it',
      when: '1/2/3',
    };
    const body = addReminderToBody('this is the body', reminder);

    const expected = `this is the body

<!-- bot: {"reminders":[{"id":1,"who":"@hello","what":"do it","when":"1/2/3"}]} -->`;

    expect(body).toEqual(expected);
  });
  test('adds a reminder to an issue body with an existing reminder list', () => {
    const reminder = {
      who: '@someone',
      what: 'to something',
      when: '1/1/2021',
    };
    const existing = `
      this is the body

<!-- bot: {"reminders":[{"id":1,"who":"@hello","what":"do it","when":"1/2/3"}]} -->
    `;
    const expected = `
      this is the body

<!-- bot: {"reminders":[{"id":1,"who":"@hello","what":"do it","when":"1/2/3"},{"id":2,"who":"@someone","what":"to something","when":"1/1/2021"}]} -->
    `;
    const result = addReminderToBody(existing, reminder);

    expect(result).toEqual(expected);
  });
});
