import { type IssueCommentCreatedEvent } from '@octokit/webhooks-types';
import { describe, expect, test } from 'vitest';
import issueContext from '../test/fixtures/issue_comment_payload.json' with { type: 'json' };
import { addReminderToBody, getReminder } from './utilities.js';

describe('getReminder', () => {
  test('can parse context', () => {
    const REFERENCE_DATE = new Date(2017, 6, 5, 4, 3, 2, 0);
    const reminder = getReminder(issueContext as IssueCommentCreatedEvent, REFERENCE_DATE);

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
    } as IssueCommentCreatedEvent);

    expect(reminder).toBeNull();
  });
  test('returns null if the command is not remind', () => {
    const reminder = getReminder({
      ...issueContext,
      comment: {
        body: '/not a command',
      },
    } as IssueCommentCreatedEvent);

    expect(reminder).toBeNull();
  });
  test('can parse multiline comments', () => {
    const REFERENCE_DATE = new Date(2017, 6, 5, 4, 3, 2, 0);
    const reminder = getReminder(
      {
        ...issueContext,
        comment: {
          body: 'This is a test\r\n/remind me to do this in one day\r\nwith some text',
        },
      } as IssueCommentCreatedEvent,
      REFERENCE_DATE,
    );

    expect(reminder).toEqual({
      who: 'Codertocat',
      when: new Date(2017, 6, 6, 9, 0, 0, 0),
      what: 'do this',
    });
  });
  test('does not parse reminder within line', () => {
    const REFERENCE_DATE = new Date(2017, 6, 5, 4, 3, 2, 0);
    const reminder = getReminder(
      {
        ...issueContext,
        comment: {
          body: 'This is a test: /remind me to do this in one day',
        },
      } as IssueCommentCreatedEvent,
      REFERENCE_DATE,
    );

    expect(reminder).toBeNull();
  });
  test('skips reminder in quote', () => {
    const REFERENCE_DATE = new Date(2017, 6, 5, 4, 3, 2, 0);
    const reminder = getReminder(
      {
        ...issueContext,
        comment: {
          body: 'This is a test\r\n> with some text\r\n> /remind me to do this in one day',
        },
      } as IssueCommentCreatedEvent,
      REFERENCE_DATE,
    );

    expect(reminder).toBeNull();
  });
  test('skips reminder in code block', () => {
    const REFERENCE_DATE = new Date(2017, 6, 5, 4, 3, 2, 0);
    const reminder = getReminder(
      {
        ...issueContext,
        comment: {
          body: 'This is a test\r\n```\r\n/remind me to do this in one day\r\n```',
        },
      } as IssueCommentCreatedEvent,
      REFERENCE_DATE,
    );

    expect(reminder).toBeNull();
  });
  test('skips reminder in code block 2', () => {
    const REFERENCE_DATE = new Date(2017, 6, 5, 4, 3, 2, 0);
    const reminder = getReminder(
      {
        ...issueContext,
        comment: {
          body: 'This is a test\r\n```python\r\n/remind me to do this in one day\r\n```',
        },
      } as IssueCommentCreatedEvent,
      REFERENCE_DATE,
    );

    expect(reminder).toBeNull();
  });
  test('skips reminder in inline code', () => {
    const REFERENCE_DATE = new Date(2017, 6, 5, 4, 3, 2, 0);
    const reminder = getReminder(
      {
        ...issueContext,
        comment: {
          body: 'This is a test: `/remind me to do this in one day`',
        },
      } as IssueCommentCreatedEvent,
      REFERENCE_DATE,
    );

    expect(reminder).toBeNull();
  });
  test('works again after code block', () => {
    const REFERENCE_DATE = new Date(2017, 6, 5, 4, 3, 2, 0);
    const reminder = getReminder(
      {
        ...issueContext,
        comment: {
          body: 'This is a test\r\n```\r\ncode here!\r\n```\r\n/remind me to do this in one day',
        },
      } as IssueCommentCreatedEvent,
      REFERENCE_DATE,
    );

    expect(reminder).toEqual({
      who: 'Codertocat',
      when: new Date(2017, 6, 6, 9, 0, 0, 0),
      what: 'do this',
    });
  });
});

describe('addReminderToBody', () => {
  test('adds a reminder to an issue body', () => {
    const reminder = {
      who: '@hello',
      what: 'do it',
      when: new Date(Date.UTC(2003, 0, 2, 0, 0, 0, 0)),
    };
    const body = addReminderToBody('this is the body', reminder);

    const expected = `this is the body

<!-- bot: {"reminders":[{"id":1,"who":"@hello","what":"do it","when":"2003-01-02T00:00:00.000Z"}]} -->`;

    expect(body).toEqual(expected);
  });
  test('adds a reminder to an issue body with an existing reminder list', () => {
    const reminder = {
      who: '@someone',
      what: 'to something',
      when: new Date(Date.UTC(2021, 0, 1, 0, 0, 0, 0)),
    };
    const existing = `
      this is the body

<!-- bot: {"reminders":[{"id":1,"who":"@hello","what":"do it","when":"2003-01-02"}]} -->
    `;
    const expected = `
      this is the body

<!-- bot: {"reminders":[{"id":1,"who":"@hello","what":"do it","when":"2003-01-02"},{"id":2,"who":"@someone","what":"to something","when":"2021-01-01T00:00:00.000Z"}]} -->
    `;
    const result = addReminderToBody(existing, reminder);

    expect(result).toEqual(expected);
  });
  test('adds a reminder to an issue body that is empty', () => {
    const reminder = {
      who: '@hello',
      what: 'do it',
      when: new Date(Date.UTC(2003, 0, 2, 0, 0, 0, 0)),
    };
    const body = addReminderToBody(null, reminder);

    const expected = `

<!-- bot: {"reminders":[{"id":1,"who":"@hello","what":"do it","when":"2003-01-02T00:00:00.000Z"}]} -->`;

    expect(body).toEqual(expected);
  });
});
