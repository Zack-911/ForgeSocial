import { ArgType, NativeFunction } from '@tryforge/forgescript';
import { ForgeSocial } from '../../..';
import { handleGitHubError } from '../../../utils/errorHandler';

enum event {
  BRANCH_PROTECTION_RULE = 'branch_protection_rule',
  CHECK_RUN = 'check_run',
  CHECK_SUITE = 'check_suite',
  CREATE = 'create',
  DELETE = 'delete',
  DEPLOYMENT = 'deployment',
  DEPLOYMENT_STATUS = 'deployment_status',
  DISCUSSION = 'discussion',
  DISCUSSION_COMMENT = 'discussion_comment',
  FORK = 'fork',
  GOLLUM = 'gollum',
  ISSUE_COMMENT = 'issue_comment',
  ISSUES = 'issues',
  LABEL = 'label',
  MERGE_GROUP = 'merge_group',
  MILESTONE = 'milestone',
  PAGE_BUILD = 'page_build',
  PUBLIC = 'public',
  PULL_REQUEST = 'pull_request',
  PULL_REQUEST_COMMENT = 'pull_request_comment',
  PULL_REQUEST_REVIEW = 'pull_request_review',
  PULL_REQUEST_REVIEW_COMMENT = 'pull_request_review_comment',
  PULL_REQUEST_TARGET = 'pull_request_target',
  PUSH = 'push',
  REGISTRY_PACKAGE = 'registry_package',
  RELEASE = 'release',
  WORKFLOW_DISPATCH = 'workflow_dispatch',
  WORKFLOW_RUN = 'workflow_run',
}

enum status {
  COMPLETED = 'completed',
  ACTION_REQUIRED = 'action_required',
  CANCELLED = 'cancelled',
  FAILURE = 'failure',
  NEUTRAL = 'neutral',
  SKIPPED = 'skipped',
  STALE = 'stale',
  SUCCESS = 'success',
  TIMED_OUT = 'timed_out',
  IN_PROGRESS = 'in_progress',
  QUEUED = 'queued',
  REQUESTED = 'requested',
  WAITING = 'waiting',
  PENDING = 'pending',
}

export default new NativeFunction({
  name: '$githubListWorkflowRuns',
  description: 'Lists workflow runs for a GitHub repository',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'owner',
      description: 'The owner of the repository',
      required: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'repo',
      description: 'The name of the repository',
      required: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'workflowId',
      description: 'The ID of the workflow, you can also pass the workflow name such as main.yml',
      required: true,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'actor',
      description:
        'Gets the workflow runs triggered by a specific user. Provide the username of the person who made the push that started the workflow.',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'branch',
      description:
        'Gets the workflow runs triggered by a specific branch. Provide the name of the branch.',
      required: false,
      rest: false,
      type: ArgType.String,
    },
    {
      name: 'event',
      description:
        'Gets the workflow runs triggered by a specific event. Provide the name of the event.',
      required: false,
      rest: false,
      type: ArgType.Enum,
      enum: event,
    },
    {
      name: 'status',
      description:
        'Filters workflow runs by their status or result. For example, you can get runs that are in_progress or that finished success. Only GitHub Actions can use waiting, pending, or requested as a status.',
      required: false,
      rest: false,
      type: ArgType.Enum,
      enum: status,
    },
    {
      name: 'limit',
      description: 'The maximum number of runs to return.',
      required: false,
      rest: false,
      type: ArgType.Number,
    },
    {
      name: 'page',
      description: 'The page of runs to return.',
      required: false,
      rest: false,
      type: ArgType.Number,
    },
    {
      name: 'excludePullRequests',
      description: 'Excludes pull requests from the list of runs.',
      required: false,
      rest: false,
      type: ArgType.Boolean,
    },
  ],
  output: ArgType.Json,
  async execute(
    ctx,
    [owner, repo, workflowId, actor, branch, event, status, limit, page, excludePullRequests],
  ) {
    const ext = ctx.client.getExtension('ForgeSocial') as ForgeSocial;
    const github = ext.github;
    if (!github) {
      return this.customError('GitHub client not initialized');
    }
    try {
      const result = await github.actions.listWorkflowRuns({
        owner,
        repo,
        workflow_id: workflowId,
        actor: actor || undefined,
        branch: branch || undefined,
        event: event || undefined,
        status: status || undefined,
        limit: limit || undefined,
        page: page || undefined,
        exclude_pull_requests: excludePullRequests || undefined,
      });
      return this.success(JSON.stringify(result, undefined, 2));
    } catch (e) {
      return this.success(handleGitHubError(e));
    }
  },
});
