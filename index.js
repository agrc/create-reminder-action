import { getInput, startGroup, info, endGroup, setFailed } from '@actions/core';
import { context as ghContext, getOctokit } from '@actions/github';
import { getReminder, addReminderToBody } from './utilities';
const LABEL = 'reminder';

function getIssueProps(context) {
  return {
    owner: context.repository.owner,
    repo: context.repository.name,
    issue_number: context.issue.number,
  };
}

function createComment(octokit, context, body) {
  return octokit.rest.issues.createComment({
    ...getIssueProps(context),
    body,
  });
}

function updateIssue(octokit, context, reminder) {
  const body = addReminderToBody(context.issue.body, reminder);

  return octokit.rest.issues.update({
    ...getIssueProps(context),
    body,
  });
}

async function run() {
  const context = ghContext.payload;
  const owner = getInput('repositoryOwner');
  const repository = getInput('repository');
  const octokit = getOctokit(
    getInput('repoToken', { required: true })
  );
  let reminder;

  context.repository = {
    owner,
    name: repository.split('/')[1],
  };

  try {
    startGroup('parsing reminder');
    reminder = getReminder(context);

    info(JSON.stringify(reminder, null, 1));

    if (!reminder) {
      info('no reminder found');
      return;
    }
    endGroup();
  } catch (error) {
    startGroup('create error comment');
    await createComment(
      octokit,
      context,
      `@${context.sender.login} we had trouble parsing your reminder. Try:\n\n\`/remind me [what] [when]\``
    );
    endGroup();

    setFailed(error);

    return;
  }

  startGroup('add label');
  info(JSON.stringify(getIssueProps(context), null, 1));
  await octokit.rest.issues.addLabels({
    ...getIssueProps(context),
    labels: [LABEL],
  });
  endGroup();

  startGroup('update issue');
  await updateIssue(octokit, context, reminder);
  endGroup();

  startGroup('add reminder comment');
  await createComment(
    octokit,
    context,
    `@${
      context.sender.login
    } set a reminder for **${reminder.when.toISOString().split('T')[0]}**`
  );
  endGroup();
}

run();
