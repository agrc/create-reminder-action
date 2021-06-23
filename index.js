const core = require('@actions/core');
const github = require('@actions/github');
const {getReminder, addLabel} = require('./utilities');

async function run() {
  const context = github.context;
  const octokit = github.getOctokit(core.getInput('token'));
  let reminder;

  try {
    reminder = getReminder(context);

    if (!reminder) {
      return;
    }

  } catch (error) {
    await octokit.github.issues.createComment(context.issue({
      body: `@${context.sender.login} we had trouble parsing your reminder. Try:\n\n\`/remind me [what] [when]\``
    }));
    core.setFailed(error);

    return;
  }

  const newLabels = addLabel(context.issue.labels);
  if (newLabels.length != context.issue.labels.length) {
    await octokit.issues.update({
      ...context.issue,
      newLabels
    });
  }

  // TODO: store reminder data somewhere
  // await metadata(context).set(reminder)

  await octokit.issues.createComment(context.issue({
    body: `@${context.sender.login} set a reminder for **${reminder.when.toLocaleDateString()}**`
  }));
}

run();
