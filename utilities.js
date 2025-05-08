import parseReminder from 'parse-reminder';

///{ who: 'me',
//   what: 'call the doctor',
//   when: 2017-09-12T12:00:00.000Z }
export function getReminder(context, referenceDate = null) {
  const body = context.comment.body;
  let remindLine = null;
  let inCode = false;

  const lines = body.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // handle code blocks
    if (line.startsWith('```')) {
      inCode = !inCode;
      continue;
    }
    if (inCode) continue;

    // find /remind at the beginning of the line.
    if (line.startsWith('/remind ')) {
      remindLine = line;
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

export function addReminderToBody(body, reminder) {
  const regex = /\r?\n\r?\n<!-- bot: (?<reminder>{"reminders":.*) -->/;

  // body is null instead of empty on no comment issues and pr's #83
  if (!body) {
    body = '';
  }

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
