const core = require('@actions/core');
const github = require('@actions/github');
const {getReminder, addReminderToBody} = require('./utilities');
const LABEL = 'reminder';

function getIssueProps(context) {
  return {
    owner: context.repository.owner,
    repo: context.repository.name,
    issue_number: context.issue.number
  };
}

function createComment(octokit, context, body) {
  return octokit.rest.issues.createComment({
    ...getIssueProps(context),
    body
  });
}

function updateIssue(octokit, context, reminder) {
  const body = addReminderToBody(context.issue.body, reminder);

  return octokit.rest.issues.update({
    ...getIssueProps(context),
    body
  });
}

async function run() {
  const context = github.context.payload;
  const owner = core.getInput('repository_owner');
  const repository = core.getInput('repository');
  context.repository = {
    owner,
    name: repository
  };
  const octokit = github.getOctokit(core.getInput('repoToken', {required:true}));
  let reminder;

  try {
    core.startGroup('parsing reminder');
    reminder = getReminder(context);

    core.info(JSON.stringify(reminder, null, 1));

    if (!reminder) {
      return;
    }
    core.endGroup();

  } catch (error) {
    core.startGroup('create error comment');
    await createComment(octokit, context, `@${context.sender.login} we had trouble parsing your reminder. Try:\n\n\`/remind me [what] [when]\``);
    core.endGroup();

    core.setFailed(error);

    return;
  }

  core.startGroup('add label');
  await octokit.rest.issues.addLabels({
    ...getIssueProps(context),
    labels: LABEL
  });
  core.endGroup();

  core.startGroup('update issue');
  await updateIssue(octokit, context, reminder);
  core.endGroup();

  core.startGroup('add reminder comment');
  await createComment(octokit, context, `@${context.sender.login} set a reminder for **${reminder.when.toLocaleDateString()}**`);
  core.endGroup();
}

run();
