# Functions

## $socialEventData

- **Version:** 1.0.0
- **Description:** Returns event data for any forgesocial events
- **Output:** Json
- **Unwrap:** false

## $githubAddRunnerLabelsRepo

- **Version:** 1.5.0
- **Description:** Adds custom labels to a self-hosted runner for a repository
- **Category:** actions
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  runnerId (Number, required) - The ID of the self-hosted runner
  -  labels (String, required) - Array of label names to add (comma-separated)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubApproveWorkflow

- **Version:** 1.5.0
- **Description:** Approves a workflow run that is waiting for review
- **Category:** actions
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  runId (Number, required) - The ID of the workflow run
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubCancelWorkflowRun

- **Version:** 1.5.0
- **Description:** Cancels a workflow run for a GitHub repository
- **Category:** actions
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  runId (Number, required) - The ID of the workflow run
  -  force (Boolean) - Force cancel the workflow run
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubDeleteArtifact

- **Version:** 1.5.0
- **Description:** Deletes an artifact from a GitHub repository
- **Category:** actions
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  artifactId (Number, required) - The ID of the artifact to delete
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubDeleteWorkflowLogs

- **Version:** 1.5.0
- **Description:** Deletes all logs for a workflow run
- **Category:** actions
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  runId (Number, required) - The ID of the workflow run
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubDispatchWorkflow

- **Version:** 1.5.0
- **Description:** Dispatches a workflow run for a GitHub repository
- **Category:** actions
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  workflowId (String, required) - The ID or filename of the workflow, e.g., main.yml
  -  ref (String, required) - The git ref (branch or tag) to run the workflow on
  -  inputs (String) - Optional JSON string of inputs for the workflow run
- **Output:** String
- **Brackets:** true
- **Unwrap:** true

## $githubDownloadArtifact

- **Version:** 1.5.0
- **Description:** Downloads an artifact for a GitHub repository
- **Category:** actions
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  artifactId (Number, required) - The ID of the artifact
  -  path (String, required) - The path to save the artifact
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubDownloadJobLogs

- **Version:** 1.5.0
- **Description:** Downloads the logs for a specific job in a workflow run
- **Category:** actions
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  jobId (Number, required) - The ID of the job
  -  perPage (Number) - Results per page (max 100)
  -  page (Number) - Page number of the results to fetch
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubDownloadWorkflowRunLogs

- **Version:** 1.5.0
- **Description:** Downloads the logs for a workflow run
- **Category:** actions
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  runId (Number, required) - The ID of the workflow run
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubGetArtifact

- **Version:** 1.5.0
- **Description:** Gets an artifact for a GitHub repository
- **Category:** actions
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  artifactId (Number, required) - The ID of the artifact
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubGetWorkflowJob

- **Version:** 1.5.0
- **Description:** Gets a specific job from a workflow run
- **Category:** actions
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  jobId (Number, required) - The ID of the job
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubGetWorkflowRun

- **Version:** 1.5.0
- **Description:** Gets a workflow run for a GitHub repository
- **Category:** actions
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  runId (Number, required) - The ID of the workflow run
  -  excludePullRequests (Boolean) - Excludes pull requests from the list of runs.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubListArtifacts

- **Version:** 1.5.0
- **Description:** Lists artifacts for a GitHub repository
- **Category:** actions
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  artifactName (String) - The name of the artifact. When provided, only artifacts with this name will be returned.
  -  limit (Number) - The maximum number of artifacts to return.
  -  page (Number) - The page of artifacts to return.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubListRunArtifacts

- **Version:** 1.5.0
- **Description:** Lists artifacts for a workflow run
- **Category:** actions
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  runId (Number, required) - The ID of the workflow run
  -  perPage (Number) - Results per page (max 100)
  -  page (Number) - Page number of the results to fetch
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubListSelfHostedRunnersRepo

- **Version:** 1.5.0
- **Description:** Lists all self-hosted runners for a repository
- **Category:** actions
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  perPage (Number) - Results per page (max 100)
  -  page (Number) - Page number of the results to fetch
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubListWorkflowJobs

- **Version:** 1.5.0
- **Description:** Lists jobs for a workflow run
- **Category:** actions
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  runId (Number, required) - The ID of the workflow run
  -  filter (Enum): [latest, all] - Filter jobs by status
  -  perPage (Number) - Results per page (max 100)
  -  page (Number) - Page number of the results to fetch
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubListWorkflowRuns

- **Version:** 1.5.0
- **Description:** Lists workflow runs for a GitHub repository
- **Category:** actions
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  workflowId (String, required) - The ID of the workflow, you can also pass the workflow name such as main.yml
  -  actor (String) - Gets the workflow runs triggered by a specific user. Provide the username of the person who made the push that started the workflow.
  -  branch (String) - Gets the workflow runs triggered by a specific branch. Provide the name of the branch.
  -  event (Enum): [BRANCH_PROTECTION_RULE, CHECK_RUN, CHECK_SUITE, CREATE, DELETE, DEPLOYMENT, DEPLOYMENT_STATUS, DISCUSSION, DISCUSSION_COMMENT, FORK, GOLLUM, ISSUE_COMMENT, ISSUES, LABEL, MERGE_GROUP, MILESTONE, PAGE_BUILD, PUBLIC, PULL_REQUEST, PULL_REQUEST_COMMENT, PULL_REQUEST_REVIEW, PULL_REQUEST_REVIEW_COMMENT, PULL_REQUEST_TARGET, PUSH, REGISTRY_PACKAGE, RELEASE, WORKFLOW_DISPATCH, WORKFLOW_RUN] - Gets the workflow runs triggered by a specific event. Provide the name of the event.
  -  status (Enum): [COMPLETED, ACTION_REQUIRED, CANCELLED, FAILURE, NEUTRAL, SKIPPED, STALE, SUCCESS, TIMED_OUT, IN_PROGRESS, QUEUED, REQUESTED, WAITING, PENDING] - Filters workflow runs by their status or result. For example, you can get runs that are in_progress or that finished success. Only GitHub Actions can use waiting, pending, or requested as a status.
  -  limit (Number) - The maximum number of runs to return.
  -  page (Number) - The page of runs to return.
  -  excludePullRequests (Boolean) - Excludes pull requests from the list of runs.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubRemoveRunnerLabelRepo

- **Version:** 1.5.0
- **Description:** Removes a custom label from a self-hosted runner for a repository
- **Category:** actions
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  runnerId (Number, required) - The ID of the self-hosted runner
  -  name (String, required) - The name of the label to remove
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubRerunFailedJobs

- **Version:** 1.5.0
- **Description:** Reruns all failed jobs in a workflow run
- **Category:** actions
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  runId (Number, required) - The ID of the workflow run
  -  enableDebugLogging (Boolean) - Whether to enable debug logging for the re-run
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubRerunWorkflow

- **Version:** 1.5.0
- **Description:** Reruns a workflow run for a GitHub repository
- **Category:** actions
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  runId (Number, required) - The ID of the workflow run
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubAddCollaborator

- **Version:** 1.5.0
- **Description:** Adds a collaborator to a repository
- **Category:** repositories
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  username (String, required) - GitHub username of the collaborator
  -  permission (Enum): [Pull, Push, Admin] - Permission level
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubCreateRelease

- **Version:** 1.5.0
- **Description:** Creates a new release
- **Category:** repositories
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  tagName (String, required) - The name of the tag
  -  targetCommitish (String) - Specifies the commitish value that determines where the Git tag is created from
  -  name (String) - The name of the release
  -  body (String) - Text describing the contents of the tag
  -  draft (Boolean) - Whether to create a draft release
  -  prerelease (Boolean) - Whether to identify the release as a prerelease
  -  generateReleaseNotes (Boolean) - Whether to automatically generate the name and body for this release
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubCreateRepoOrg

- **Version:** 1.5.0
- **Description:** Creates a new repository in an organization
- **Category:** repositories
- **Arguments:**
  -  org (String, required) - The organization name
  -  name (String, required) - Repository name
  -  description (String) - Repository description
  -  homepage (String) - Repository homepage URL
  -  private (Boolean) - Whether the repository should be private
  -  hasIssues (Boolean) - Enable issues for the repository
  -  hasProjects (Boolean) - Enable projects for the repository
  -  hasWiki (Boolean) - Enable wiki for the repository
  -  teamId (Number) - Team ID to grant access
  -  autoInit (Boolean) - Initialize repository with a README
  -  gitignoreTemplate (String) - Git ignore template
  -  licenseTemplate (String) - License template
  -  allowSquashMerge (Boolean) - Allow squash merging
  -  allowMergeCommit (Boolean) - Allow merge commits
  -  allowRebaseMerge (Boolean) - Allow rebase merging
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubCreateRepoUser

- **Version:** 1.5.0
- **Description:** Creates a new repository for the authenticated user
- **Category:** repositories
- **Arguments:**
  -  name (String, required) - Repository name
  -  description (String) - Repository description
  -  homepage (String) - Repository homepage URL
  -  private (Boolean) - Whether the repository should be private
  -  hasIssues (Boolean) - Enable issues for the repository
  -  hasProjects (Boolean) - Enable projects for the repository
  -  hasWiki (Boolean) - Enable wiki for the repository
  -  autoInit (Boolean) - Initialize repository with a README
  -  gitignoreTemplate (String) - Git ignore template
  -  licenseTemplate (String) - License template
  -  allowSquashMerge (Boolean) - Allow squash merging
  -  allowMergeCommit (Boolean) - Allow merge commits
  -  allowRebaseMerge (Boolean) - Allow rebase merging
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubDeleteFile

- **Version:** 1.5.0
- **Description:** Deletes a file from a GitHub repository
- **Category:** repositories
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  path (String, required) - The path to the file to delete
  -  message (String, required) - The commit message
  -  sha (String, required) - The blob SHA of the file being deleted
  -  branch (String) - The branch name (default: repository's default branch)
  -  committerName (String) - Name of the committer
  -  committerEmail (String) - Email of the committer
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubDeleteRelease

- **Version:** 1.5.0
- **Description:** Deletes a GitHub release
- **Category:** repositories
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  releaseId (Number, required) - The ID of the release to delete
- **Output:** Boolean
- **Brackets:** true
- **Unwrap:** true

## $githubDeleteRepo

- **Version:** 1.5.0
- **Description:** Deletes a repository
- **Category:** repositories
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubGetBranch

- **Version:** 1.5.0
- **Description:** Gets a specific branch from a repository
- **Category:** repositories
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  branch (String, required) - The name of the branch
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubGetFileContent

- **Version:** 1.5.0
- **Description:** Gets the content of a file from a repository
- **Category:** repositories
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  path (String, required) - The path to the file
  -  ref (String) - Git reference (branch, commit, or tag)
- **Output:** String
- **Brackets:** true
- **Unwrap:** true

## $githubGetRelease

- **Version:** 1.5.0
- **Description:** Gets a release by its ID
- **Category:** repositories
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  releaseId (Number, required) - The ID of the release
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubGetRepo

- **Version:** 1.5.0
- **Description:** Gets a repository
- **Category:** repositories
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubListBranches

- **Version:** 1.5.0
- **Description:** Lists branches for a repository
- **Category:** repositories
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  perPage (Number) - Number of results per page (default: 30, max: 100)
  -  page (Number) - Page number
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubListCollaborators

- **Version:** 1.5.0
- **Description:** Lists repository collaborators
- **Category:** repositories
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  affiliation (Enum): [Outside, Direct, All] - Filter collaborators by affiliation
  -  perPage (Number) - Results per page (max 100)
  -  page (Number) - Page number
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubListOrgRepos

- **Version:** 1.5.0
- **Description:** Lists organization repositories
- **Category:** repositories
- **Arguments:**
  -  org (String, required) - The organization name
  -  type (Enum): [All, Public, Private, Forks, Sources, Member] - Type of repositories to list
  -  sort (Enum): [Created, Updated, Pushed, FullName] - Sorting criterion
  -  direction (Enum): [Asc, Desc] - Sorting direction
  -  perPage (Number) - Results per page (max 100)
  -  page (Number) - Page number
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubListReleases

- **Version:** 1.5.0
- **Description:** Lists releases for a repository
- **Category:** repositories
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  perPage (Number) - Results per page (max 100)
  -  page (Number) - Page number
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubListUserRepos

- **Version:** 1.5.0
- **Description:** Lists repositories for a user
- **Category:** repositories
- **Arguments:**
  -  username (String, required) - GitHub username
  -  type (Enum): [All, Owner, Member] - Type of repositories to list
  -  sort (Enum): [Created, Updated, Pushed, FullName] - Sorting criterion
  -  direction (Enum): [Asc, Desc] - Sorting direction
  -  perPage (Number) - Results per page (max 100)
  -  page (Number) - Page number
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubRemoveCollaborator

- **Version:** 1.5.0
- **Description:** Removes a collaborator from a repository
- **Category:** repositories
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  username (String, required) - GitHub username of the collaborator
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubUnprotectBranch

- **Version:** 1.5.0
- **Description:** Removes branch protection from a repository branch
- **Category:** repositories
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  branch (String, required) - The name of the branch to unprotect
- **Output:** Boolean
- **Brackets:** true
- **Unwrap:** true

## $githubUpdateFile

- **Version:** 1.5.0
- **Description:** Creates or updates a file in a repository
- **Category:** repositories
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  path (String, required) - The path where to create/update the file
  -  message (String, required) - Commit message
  -  content (String, required) - File content (will be base64 encoded)
  -  sha (String) - Blob SHA of the file being replaced (required for updates)
  -  branch (String) - Branch name
  -  committerName (String) - Committer name
  -  committerEmail (String) - Committer email
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubUpdateRelease

- **Version:** 1.5.0
- **Description:** Updates an existing GitHub release
- **Category:** repositories
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  releaseId (Number, required) - The ID of the release to update
  -  tagName (String) - The new tag name
  -  name (String) - The new release name
  -  body (String) - The new release description
  -  draft (Boolean) - Whether the release is a draft
  -  prerelease (Boolean) - Whether the release is a prerelease
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubUpdateRepo

- **Version:** 1.5.0
- **Description:** Updates a repository
- **Category:** repositories
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  name (String) - New repository name
  -  description (String) - New repository description
  -  homepage (String) - New repository homepage URL
  -  private (Boolean) - Whether the repository should be private
  -  hasIssues (Boolean) - Enable issues for the repository
  -  hasProjects (Boolean) - Enable projects for the repository
  -  hasWiki (Boolean) - Enable wiki for the repository
  -  teamId (Number) - Team ID to grant access
  -  allowSquashMerge (Boolean) - Allow squash merging
  -  allowMergeCommit (Boolean) - Allow merge commits
  -  allowRebaseMerge (Boolean) - Allow rebase merging
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubUploadReleaseAsset

- **Version:** 1.5.0
- **Description:** Uploads an asset to a GitHub release
- **Category:** repositories
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  releaseId (Number, required) - The ID of the release
  -  filePath (String, required) - Path to the file to upload
  -  assetName (String) - Name to give the asset
  -  contentType (String) - MIME type of the asset (default: application/octet-stream)
  -  label (String) - Label for the asset
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $searchReddit

- **Version:** 1.0.0
- **Description:** Search Reddit for posts, comments, users, or subreddits
- **Category:** reddit
- **Arguments:**
  -  query (String, required) - The search query string
  -  type (Enum): [link, comment, sr, user, all] - Type of result to return: link, comment, sr, user, or all
  -  limit (Number) - Maximum number of results (default: 25)
  -  sort (Enum): [new, hot, top, relevance, comments] - Sorting method (relevance, hot, new, top, comments)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getRandomSubreddit

- **Version:** 1.0.0
- **Description:** Get Random Subreddits info
- **Category:** subreddit
- **Arguments:**
  -  filter (Enum): [popular, new] - Filter subreddit list by 'popular' or 'new'
  -  limit (Number) - Maximum number of subreddits to return (max 25)
- **Output:** Json
- **Brackets:** false
- **Unwrap:** true

## $getSubreddit

- **Version:** 1.0.0
- **Description:** Get the subreddit about page of the name you gave
- **Category:** subreddit
- **Arguments:**
  -  subreddit (String, required, rest) - The subreddit to get the about page of
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getSubredditFeed

- **Version:** 1.0.0
- **Description:** Get the readable subreddit feed (title, author, upvotes, etc)
- **Category:** subreddit
- **Arguments:**
  -  subreddit (String, required) - The subreddit to get the feed of
  -  filter (Enum): [best, popular, new, hot, top, rising] - Filter the posts by what you want bbg
  -  limit (Number) - Maximum number of posts to return (max 25)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getSubredditRules

- **Version:** 1.0.0
- **Description:** Get the rules for a subreddit
- **Category:** subreddit
- **Arguments:**
  -  subreddit (String, required) - The subreddit to get the rules for
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $trackSubredditsList

- **Version:** 1.0.0
- **Description:** Returns all active tracked subreddits
- **Category:** subreddit
- **Output:** Json
- **Unwrap:** false

## $removeTrackedSubreddit

- **Version:** 1.0.0
- **Description:** Returns removes subreddit from tracking
- **Category:** subreddit
- **Arguments:**
  -  name (String, required) - subreddit name
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $searchSubredditPosts

- **Version:** 1.0.0
- **Description:** Search for posts within a specific subreddit
- **Category:** subreddit
- **Arguments:**
  -  subreddit (String, required) - The subreddit to search in
  -  query (String, required) - The search query string
  -  limit (Number) - Maximum number of results (default: 25)
  -  sort (Enum): [new, hot, top, relevance, comments] - Sorting method (relevance, hot, new, top, comments)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $trackSubreddit

- **Version:** 1.0.0
- **Description:** Track subreddits new posts
- **Category:** subreddit
- **Arguments:**
  -  subreddit (String, required) - The subreddit to track
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getUser

- **Version:** 1.0.0
- **Description:** Get the users info about page of the name you gave
- **Category:** user
- **Arguments:**
  -  username (String, required, rest) - The username to get the info of (without u/)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getUserActivity

- **Version:** 1.0.0
- **Description:** Get the users activity page of the name you gave
- **Category:** user
- **Arguments:**
  -  username (String, required, rest) - The username to get the activity of (without u/)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getUserComments

- **Version:** 1.0.0
- **Description:** Get the users comments page of the name you gave
- **Category:** user
- **Arguments:**
  -  username (String, required, rest) - The username to get the comments of (without u/)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getUserOverview

- **Version:** 1.0.0
- **Description:** Get the users overview
- **Category:** user
- **Arguments:**
  -  username (String, required, rest) - The username to get the overview of (without u/)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getUserSubmissions

- **Version:** 1.0.0
- **Description:** Get the users submissions page of the name you gave
- **Category:** user
- **Arguments:**
  -  username (String, required, rest) - The username to get the submissions of (without u/)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getUserTrophies

- **Version:** 1.0.0
- **Description:** Get the users trophies
- **Category:** user
- **Arguments:**
  -  username (String, required, rest) - The username to get the trophies of (without u/)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getWiki

- **Version:** 1.0.0
- **Description:** Get the subreddit wiki index page of the name you gave
- **Category:** wiki
- **Arguments:**
  -  subreddit (String, required, rest) - The subreddit to get the wiki index page of
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getWikiPage

- **Version:** 1.0.0
- **Description:** Get the subreddit wiki page. 
- **Category:** wiki
- **Arguments:**
  -  subreddit (String, required) - The subreddit to get the wiki pages of
  -  page (String) - The page name to get
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getWikiRevisions

- **Version:** 1.0.0
- **Description:** Get the subreddit wiki page revisions. Returns all revisions if page not specified. 
- **Category:** wiki
- **Arguments:**
  -  subreddit (String, required) - The subreddit to get the wiki revisions of
  -  page (String) - The page name to get the revisions of
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $extractVideoID

- **Version:** 1.0.0
- **Description:** Extracts a YouTube video ID from a URL or string.
- **Category:** youtube
- **Arguments:**
  -  input (String, required) - YouTube URL or video ID
- **Output:** String
- **Brackets:** true
- **Unwrap:** true

## $getYoutubeChannel

- **Version:** 1.0.0
- **Description:** Gets info about a YouTube channel by ID or handle.
- **Category:** youtube
- **Arguments:**
  -  identifier (String, required) - Channel ID or handle (e.g. UC... or @username)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $listTrackedYoutubeChannels

- **Version:** 1.0.0
- **Description:** Returns a list of all tracked YouTube channel IDs.
- **Category:** youtube
- **Unwrap:** false

## $searchYoutube

- **Version:** 1.3.0
- **Description:** Searches YouTube and returns the top videos in JSON format. Supports filters.
- **Category:** youtube
- **Arguments:**
  -  query (String, required) - The search query to look up on YouTube
  -  limit (Number) - Maximum number of videos to return (default 5, max 25)
  -  uploadDate (Enum): [All, Hour, Today, Week, Month, Year] - Upload date filter
  -  duration (Enum): [All, Short, Medium, Long] - Video duration filter
  -  sortBy (Enum): [Relevance, Rating, UploadDate, ViewCount] - Sort results by
  -  features (Enum, rest): [HD, Subtitles, FourK, Live, ThreeSixty, ThreeD, HDR, CC, VR180] - Features to filter by
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $searchYoutubeChannel

- **Version:** 1.3.0
- **Description:** Searches YouTube and returns matching channels in JSON format.
- **Category:** youtube
- **Arguments:**
  -  query (String, required) - Search query for YouTube channels
  -  limit (Number) - Maximum number of channels to return (default 5, max 25)
  -  sortBy (Enum): [Relevance, Rating, UploadDate, ViewCount] - Sort results by (optional)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $searchYoutubeMusic

- **Version:** 1.3.0
- **Description:** Searches YouTube Music and returns songs in JSON format.
- **Category:** youtube
- **Arguments:**
  -  query (String, required) - Search query for music
  -  limit (Number) - Max number of songs to return (default 5, max 25)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $searchYoutubePlaylist

- **Version:** 1.3.0
- **Description:** Searches YouTube and returns the playlists in JSON format. Supports filters.
- **Category:** youtube
- **Arguments:**
  -  query (String, required) - The search query to look up on YouTube
  -  limit (Number) - Maximum number of playlists to return (default 5, max 25)
  -  uploadDate (Enum): [All, Hour, Today, Week, Month, Year] - Upload date filter
  -  duration (Enum): [All, Short, Medium, Long] - Video duration filter
  -  sortBy (Enum): [Relevance, Rating, UploadDate, ViewCount] - Sort results by
  -  features (Enum, rest): [HD, Subtitles, FourK, Live, ThreeSixty, ThreeD, HDR, CC, VR180] - Features to filter by
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $trackYoutubeChannel

- **Version:** 1.0.0
- **Description:** Starts tracking a YouTube channel and emits events on new uploads.
- **Category:** youtube
- **Arguments:**
  -  channelId (String, required) - The channel ID to track (e.g. UC_x5XG1OV2P6uZZ5FSM9Ttw)
- **Brackets:** true
- **Unwrap:** true

## $unTrackYoutubeChannel

- **Version:** 1.0.0
- **Description:** Stops tracking a previously tracked YouTube channel.
- **Category:** youtube
- **Arguments:**
  -  channelId (String, required) - The channel ID to untrack.
- **Brackets:** true
- **Unwrap:** true

## $getYoutubeVideo

- **Version:** 1.3.0
- **Description:** Returns the youtube videos info.
- **Category:** youtube
- **Arguments:**
  -  ID (String, required) - The video ID to get info about
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

