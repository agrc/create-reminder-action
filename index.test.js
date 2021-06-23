const issueContext = require('./issue_comment_payload.json');
const { getReminder } = require('./utilities');

describe('getReminder', () => {
  test('can parse context', () => {
    const REFERENCE_DATE = new Date(2017, 6, 5, 4, 3, 2, 0);
    const reminder = getReminder(issueContext, REFERENCE_DATE);

    expect(reminder).toEqual({
      who: 'Codertocat', when: new Date(2017, 6, 6, 9, 0, 0, 0), what: 'do something'
    });
  });
  test('returns null if not a slash command', () => {
    const reminder = getReminder({
      ...issueContext,
      comment: {
        body: 'not a command'
      }
    });

    expect(reminder).toBeNull();
  })
  test('returns null if the command is not remind', () => {
    const reminder = getReminder({
      ...issueContext,
      comment: {
        body: '/not a command'
      }
    });

    expect(reminder).toBeNull();
  });
});
