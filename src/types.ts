import type { IssueCommentCreatedEvent, IssueCommentEditedEvent } from '@octokit/webhooks-types';

export type IssueCommentCreatedOrEditedEvent = IssueCommentCreatedEvent | IssueCommentEditedEvent;
