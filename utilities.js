const parseReminder = require('parse-reminder');

const LABEL = 'reminder';

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

function addLabel(labels) {
  // Add reminder label if it doesn't already exist.
  if (!labels.find(({ name }) => name === LABEL)) {
    labels.push(LABEL);
  }

  return labels;
}

module.exports = { getReminder, addLabel };
