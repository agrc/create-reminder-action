const core = require('@actions/core');
const github = require('@actions/github');
const {getReminder, addReminderToBody} = require('./utilities');
const LABEL = 'reminder';

function createComment(octokit, context, body) {
  return octokit.rest.issues.createComment({
    owner: context.repository.owner.id,
    repo: context.repository.name,
    issue_number: context.issue.number,
    body
  });
}

function updateIssue(octokit, context, reminder) {
  const body = addReminderToBody(context.issue.body, reminder);

  return octokit.rest.issues.update({
    owner: context.repository.owner.id,
    repo: context.repository.name,
    issue_number: context.issue.number,
    body
  });
}

async function run() {
  const context = github.context.payload;
  const octokit = github.getOctokit(core.getInput('repoToken', {required:true}));
  let reminder;

  try {
    reminder = getReminder(context);

    if (!reminder) {
      return;
    }

  } catch (error) {
    await createComment(octokit, context, `@${context.sender.login} we had trouble parsing your reminder. Try:\n\n\`/remind me [what] [when]\``);
    core.setFailed(error);

    return;
  }

  await octokit.rest.issues.addLabels({
    owner: context.repository.owner.id,
    repo: context.repository.name,
    issue_number: context.issue.number,
    labels: LABEL
  });

  updateIssue(octokit, context, reminder);

  await createComment(octokit, context, `@${context.sender.login} set a reminder for **${reminder.when.toLocaleDateString()}**`);
}

run();
