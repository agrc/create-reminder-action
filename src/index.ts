import { endGroup, getInput, info, setFailed, startGroup } from '@actions/core';
import { getOctokit, context as ghContext } from '@actions/github';
import { GitHub } from '@actions/github/lib/utils.js';
import { IssueCommentCreatedEvent, IssueCommentEditedEvent } from '@octokit/webhooks-types';
import { addReminderToBody, getReminder } from './utilities.js';
const LABEL = 'reminder';

export type IssueCommentCreatedOrEditedEvent = IssueCommentCreatedEvent | IssueCommentEditedEvent;
type Octokit = InstanceType<typeof GitHub>;

function getIssueProps(context: IssueCommentCreatedOrEditedEvent) {
  const inputOwner = getInput('repositoryOwner');
  const inputRepository = getInput('repository');
  const repo = inputRepository ? inputRepository.split('/')[1] : context.repository.name;

  return {
    owner: inputOwner ?? context.repository.owner.login,
    repo,
    issue_number: context.issue.number,
  };
}

function createComment(octokit: Octokit, context: IssueCommentCreatedOrEditedEvent, body: string) {
  return octokit.rest.issues.createComment({
    ...getIssueProps(context),
    body,
  });
}

function updateIssue(octokit: Octokit, context: IssueCommentCreatedOrEditedEvent, reminder: Reminder) {
  const body = addReminderToBody(context.issue.body || null, reminder);

  return octokit.rest.issues.update({
    ...getIssueProps(context),
    body,
  });
}

async function run() {
  const testContextPath = getInput('testContextPath', { required: false });
  let testContext: IssueCommentCreatedOrEditedEvent | null = null;
  if (testContextPath) {
    info('running in test mode');

    try {
      testContext = await import(testContextPath);
    } catch (error) {
      setFailed(`failed to import testContextPath (${testContextPath}): ${error}`);

      return;
    }
  }
  const context = testContext || (ghContext.payload as IssueCommentCreatedOrEditedEvent);
  const octokit = getOctokit(getInput('repoToken', { required: true }));
  let reminder: Reminder | null = null;

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
      `@${context.sender.login} we had trouble parsing your reminder. Try:\n\n\`/remind me [what] [when]\``,
    );
    endGroup();

    setFailed(error instanceof Error ? error.message : String(error));

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
    `@${context.sender.login} set a reminder for **${reminder.when.toISOString().split('T')[0]}**`,
  );
  endGroup();
}

run();
