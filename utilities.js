const parseReminder = require('parse-reminder');

///{ who: 'me',
//   what: 'call the doctor',
//   when: 2017-09-12T12:00:00.000Z }
function getReminder(context, referenceDate = null) {
  const body = context.comment.body;
  if (!body.startsWith('/')) {
    return null;
  }

  const firstWord = body.slice(1, body.indexOf(' '));
  if (firstWord !== 'remind') {
    return null;
  }

  const reminder = parseReminder(body.slice(1), referenceDate);

  if (!reminder) {
    throw new Error(`Unable to parse reminder: remind ${body}`);
  }

  if (reminder.who === 'me') {
    reminder.who = context.sender.login;
  }

  return reminder;
}

function addReminderToBody(body, reminder) {
  const regex = /\n\n<!-- bot: (?<reminder>{"reminders":.*) -->/;
  const match = body.match(regex);

  const reminders = match ? JSON.parse(match.groups.reminder).reminders : [];
  let id = 1;
  if (reminders.length > 0) {
    id = reminders[reminders.length - 1].id + 1;
  }

  reminders.push({
    id,
    ...reminder
  });

  const comment = `\n\n<!-- bot: ${JSON.stringify({reminders})} -->`
  if (match) {
    return body.replace(regex, comment);
  }

  return `${body}${comment}`;
}

module.exports = { getReminder, addReminderToBody };
