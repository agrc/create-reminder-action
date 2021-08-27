const parseReminder = require('parse-reminder');

///{ who: 'me',
//   what: 'call the doctor',
//   when: 2017-09-12T12:00:00.000Z }
function getReminder(context, referenceDate = null) {
  const body = context.comment.body;
  let remindLine = null;
  let inCode = false;

  const lines = body.split('\n');
  for (let i=0; i<lines.length; i++) {
    const line = lines[i].trim();

    // handle code blocks
    if (line.startsWith('```')) {
      inCode = !inCode;
      continue;
    }
    if (inCode)
      continue;

    // handle quoted text
    if (line.startsWith('>')) {
      continue;
    }

    // find /remind in line.
    const words = line.split(' ');
    for (let j=0; j<words.length; j++) {
      const word = words[j];
      if (word === '/remind') {
        remindLine = words.slice(j).join(' ');
        break;
      }
    }
    if (remindLine !== null) {
      break;
    }
  }

  if (remindLine === null) {
    return null;
  }

  const reminder = parseReminder(remindLine.slice(1), referenceDate);

  if (!reminder) {
    throw new Error(`Unable to parse reminder: remind ${body}`);
  }

  if (reminder.who === 'me') {
    reminder.who = context.sender.login;
  }

  return reminder;
}

function addReminderToBody(body, reminder) {
  const regex = /\r?\n\r?\n<!-- bot: (?<reminder>{"reminders":.*) -->/;
  const match = body.match(regex);

  const reminders = match ? JSON.parse(match.groups.reminder).reminders : [];
  let id = 1;
  if (reminders.length > 0) {
    id = reminders[reminders.length - 1].id + 1;
  }

  reminders.push({
    id,
    ...reminder,
  });

  const comment = `\n\n<!-- bot: ${JSON.stringify({ reminders })} -->`;
  if (match) {
    return body.replace(regex, comment);
  }

  return `${body}${comment}`;
}

module.exports = { getReminder, addReminderToBody };
