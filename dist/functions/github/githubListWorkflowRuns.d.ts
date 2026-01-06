import { ArgType, NativeFunction } from '@tryforge/forgescript';
declare enum event {
    BRANCH_PROTECTION_RULE = "branch_protection_rule",
    CHECK_RUN = "check_run",
    CHECK_SUITE = "check_suite",
    CREATE = "create",
    DELETE = "delete",
    DEPLOYMENT = "deployment",
    DEPLOYMENT_STATUS = "deployment_status",
    DISCUSSION = "discussion",
    DISCUSSION_COMMENT = "discussion_comment",
    FORK = "fork",
    GOLLUM = "gollum",
    ISSUE_COMMENT = "issue_comment",
    ISSUES = "issues",
    LABEL = "label",
    MERGE_GROUP = "merge_group",
    MILESTONE = "milestone",
    PAGE_BUILD = "page_build",
    PUBLIC = "public",
    PULL_REQUEST = "pull_request",
    PULL_REQUEST_COMMENT = "pull_request_comment",
    PULL_REQUEST_REVIEW = "pull_request_review",
    PULL_REQUEST_REVIEW_COMMENT = "pull_request_review_comment",
    PULL_REQUEST_TARGET = "pull_request_target",
    PUSH = "push",
    REGISTRY_PACKAGE = "registry_package",
    RELEASE = "release",
    WORKFLOW_DISPATCH = "workflow_dispatch",
    WORKFLOW_RUN = "workflow_run"
}
declare enum status {
    COMPLETED = "completed",
    ACTION_REQUIRED = "action_required",
    CANCELLED = "cancelled",
    FAILURE = "failure",
    NEUTRAL = "neutral",
    SKIPPED = "skipped",
    STALE = "stale",
    SUCCESS = "success",
    TIMED_OUT = "timed_out",
    IN_PROGRESS = "in_progress",
    QUEUED = "queued",
    REQUESTED = "requested",
    WAITING = "waiting",
    PENDING = "pending"
}
declare const _default: NativeFunction<[{
    name: string;
    description: string;
    required: true;
    rest: false;
    type: ArgType.String;
}, {
    name: string;
    description: string;
    required: true;
    rest: false;
    type: ArgType.String;
}, {
    name: string;
    description: string;
    required: true;
    rest: false;
    type: ArgType.String;
}, {
    name: string;
    description: string;
    required: false;
    rest: false;
    type: ArgType.String;
}, {
    name: string;
    description: string;
    required: false;
    rest: false;
    type: ArgType.String;
}, {
    name: string;
    description: string;
    required: false;
    rest: false;
    type: ArgType.Enum;
    enum: typeof event;
}, {
    name: string;
    description: string;
    required: false;
    rest: false;
    type: ArgType.Enum;
    enum: typeof status;
}, {
    name: string;
    description: string;
    required: false;
    rest: false;
    type: ArgType.Number;
}, {
    name: string;
    description: string;
    required: false;
    rest: false;
    type: ArgType.Number;
}, {
    name: string;
    description: string;
    required: false;
    rest: false;
    type: ArgType.Boolean;
}], true>;
export default _default;
//# sourceMappingURL=githubListWorkflowRuns.d.ts.map