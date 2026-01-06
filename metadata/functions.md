# Functions

## $socialEventData

- **Version:** 1.0.0
- **Description:** Returns event data for any forgesocial events
- **Output:** Json
- **Unwrap:** false

## $githubAddAssignees

- **Version:** 1.5.8
- **Description:** Add assignees to an issue in a GitHub repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - Repository owner
  -  repo (String, required) - Repository name
  -  issue_number (Number, required) - Issue number
  -  assignees (String, required) - Comma-separated list of assignees to add
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubAddCollaborator

- **Version:** 1.5.8
- **Description:** Adds a collaborator to a repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  username (String, required) - GitHub username of the collaborator
  -  permission (Enum): [Pull, Push, Admin] - Permission level
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubAddLabels

- **Version:** 1.5.8
- **Description:** Add labels to an issue in a GitHub repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - Repository owner
  -  repo (String, required) - Repository name
  -  issue_number (Number, required) - Issue number
  -  labels (String, required) - Comma-separated list of labels to add
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubAddRunnerLabelsRepo

- **Version:** 1.5.8
- **Description:** Adds custom labels to a self-hosted runner for a repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  runnerId (Number, required) - The ID of the self-hosted runner
  -  labels (String, required) - Array of label names to add (comma-separated)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubApproveWorkflow

- **Version:** 1.5.8
- **Description:** Approves a workflow run that is waiting for review
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  runId (Number, required) - The ID of the workflow run
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubAuthenticatedUser

- **Version:** 1.5.8
- **Description:** Get the authenticated user
- **Category:** github
- **Output:** Json
- **Unwrap:** false

## $githubCancelWorkflowRun

- **Version:** 1.5.8
- **Description:** Cancels a workflow run for a GitHub repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  runId (Number, required) - The ID of the workflow run
  -  force (Boolean) - Force cancel the workflow run
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubCheckFollowing

- **Version:** 1.5.8
- **Description:** Check if the user is following the other user
- **Category:** github
- **Arguments:**
  -  username (String, required) - The username of the user
  -  targetUsername (String, required) - The username of the user to check
- **Output:** Boolean
- **Brackets:** true
- **Unwrap:** true

## $githubCreateComment

- **Version:** 1.5.8
- **Description:** Create a comment on an issue or pull request
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  issue_number (Number, required) - The issue number
  -  body (String, required) - The contents of the comment
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubCreateIssue

- **Version:** 1.5.8
- **Description:** Create a new issue in a GitHub repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - Repository owner
  -  repo (String, required) - Repository name
  -  title (String, required) - Issue title
  -  body (String) - Issue body
  -  assignees (String) - Comma-separated list of usernames to assign
  -  labels (String) - Comma-separated list of label names
  -  milestone (Number) - Milestone ID to associate the issue with
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubCreateRelease

- **Version:** 1.5.8
- **Description:** Creates a new release
- **Category:** github
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

- **Version:** 1.5.8
- **Description:** Creates a new repository in an organization
- **Category:** github
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
  -  gitignoreTemplate (Enum): [Actionscript, Ada, Agda, Android, AppEngine, AppceleratorTitanium, ArchLinuxPackages, Autotools, C, CPlusPlus, CMake, CSharp, CakePHP, ChefCookbook, Clojure, CodeIgniter, CommonLisp, Composer, Concrete5, Coq, CraftCMS, D, Dart, Delphi, Drupal, EPiServer, Eagle, Elisp, Elixir, Elm, Erlang, ExpressionEngine, ExtJs, Fancy, Finale, ForceDotCom, Fortran, FuelPHP, GWT, GitBook, Go, Godot, Gradle, Grails, Haskell, IGORPro, Idris, Java, Jboss, Jekyll, Joomla, Julia, KiCad, Kohana, Kotlin, LabVIEW, Laravel, Leiningen, LemonStand, Lilypond, Lithium, Lua, Magento, Maven, Mercury, MetaProgrammingSystem, Nginx, Node, ObjectiveC, OCaml, Opa, OpenCart, OracleForms, Packer, Perl, Perl6, Phalcon, PlayFramework, Plone, Prestashop, Processing, Python, Qooxdoo, Qt, R, Rails, Raku, RhodesRhomobile, ROS, Ruby, Rust, Sass, Scala, Scheme, SCons, Scrivener, Smalltalk, SugarCRM, Swift, Symfony, SymphonyCMS, Terraform, TeX, Textpattern, TurboGears2, Typo3, Umbraco, Unity, UnrealEngine, VisualStudio, VVVV, Waf, WordPress, Xojo, Yeoman, Yii, ZendFramework] - Git ignore template
  -  licenseTemplate (Enum): [AFL_3_0, Apache_2_0, Artistic_2_0, BSL_1_0, BSD_2_Clause, BSD_3_Clause, CC0_1_0, CDDL_1_0, EPL_2_0, EPL_1_0, EUPL_1_1, GPL_2_0, GPL_3_0, ISC, LGPL_2_1, LGPL_3_0, MIT, MPL_2_0, OSL_3_0, OFL_1_1, NCSA, Unlicense, Zlib] - License template
  -  allowSquashMerge (Boolean) - Allow squash merging
  -  allowMergeCommit (Boolean) - Allow merge commits
  -  allowRebaseMerge (Boolean) - Allow rebase merging
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubCreateRepoUser

- **Version:** 1.5.8
- **Description:** Creates a new repository for the authenticated user
- **Category:** github
- **Arguments:**
  -  name (String, required) - Repository name
  -  description (String) - Repository description
  -  homepage (String) - Repository homepage URL
  -  private (Boolean) - Whether the repository should be private
  -  hasIssues (Boolean) - Enable issues for the repository
  -  hasProjects (Boolean) - Enable projects for the repository
  -  hasWiki (Boolean) - Enable wiki for the repository
  -  autoInit (Boolean) - Initialize repository with a README
  -  gitignoreTemplate (Enum): [Actionscript, Ada, Agda, Android, AppEngine, AppceleratorTitanium, ArchLinuxPackages, Autotools, C, CPlusPlus, CMake, CSharp, CakePHP, ChefCookbook, Clojure, CodeIgniter, CommonLisp, Composer, Concrete5, Coq, CraftCMS, D, Dart, Delphi, Drupal, EPiServer, Eagle, Elisp, Elixir, Elm, Erlang, ExpressionEngine, ExtJs, Fancy, Finale, ForceDotCom, Fortran, FuelPHP, GWT, GitBook, Go, Godot, Gradle, Grails, Haskell, IGORPro, Idris, Java, Jboss, Jekyll, Joomla, Julia, KiCad, Kohana, Kotlin, LabVIEW, Laravel, Leiningen, LemonStand, Lilypond, Lithium, Lua, Magento, Maven, Mercury, MetaProgrammingSystem, Nginx, Node, ObjectiveC, OCaml, Opa, OpenCart, OracleForms, Packer, Perl, Perl6, Phalcon, PlayFramework, Plone, Prestashop, Processing, Python, Qooxdoo, Qt, R, Rails, Raku, RhodesRhomobile, ROS, Ruby, Rust, Sass, Scala, Scheme, SCons, Scrivener, Smalltalk, SugarCRM, Swift, Symfony, SymphonyCMS, Terraform, TeX, Textpattern, TurboGears2, Typo3, Umbraco, Unity, UnrealEngine, VisualStudio, VVVV, Waf, WordPress, Xojo, Yeoman, Yii, ZendFramework] - Git ignore template. If i am missing a template let me know
  -  licenseTemplate (Enum): [AFL_3_0, Apache_2_0, Artistic_2_0, BSL_1_0, BSD_2_Clause, BSD_3_Clause, CC0_1_0, CDDL_1_0, EPL_2_0, EPL_1_0, EUPL_1_1, GPL_2_0, GPL_3_0, ISC, LGPL_2_1, LGPL_3_0, MIT, MPL_2_0, OSL_3_0, OFL_1_1, NCSA, Unlicense, Zlib] - License template. If i am missing a template let me know
  -  allowSquashMerge (Boolean) - Allow squash merging
  -  allowMergeCommit (Boolean) - Allow merge commits
  -  allowRebaseMerge (Boolean) - Allow rebase merging
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubDeleteArtifact

- **Version:** 1.5.8
- **Description:** Deletes an artifact from a GitHub repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  artifactId (Number, required) - The ID of the artifact to delete
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubDeleteComment

- **Version:** 1.5.8
- **Description:** Delete a comment on an issue or pull request
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  comment_id (Number, required) - The ID of the comment to delete
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubDeleteFile

- **Version:** 1.5.8
- **Description:** Deletes a file from a GitHub repository
- **Category:** github
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

## $githubDeletePullReviewComment

- **Version:** 1.5.8
- **Description:** Delete a pull request review comment
- **Category:** github
- **Arguments:**
  -  owner (String, required) - Repository owner
  -  repo (String, required) - Repository name
  -  commentId (Number, required) - The ID of the comment to delete
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubDeleteRelease

- **Version:** 1.5.8
- **Description:** Deletes a GitHub release
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  releaseId (Number, required) - The ID of the release to delete
- **Output:** Boolean
- **Brackets:** true
- **Unwrap:** true

## $githubDeleteRepo

- **Version:** 1.5.8
- **Description:** Deletes a repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubDeleteWorkflowLogs

- **Version:** 1.5.8
- **Description:** Deletes all logs for a workflow run
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  runId (Number, required) - The ID of the workflow run
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubDispatchWorkflow

- **Version:** 1.5.8
- **Description:** Dispatches a workflow run for a GitHub repository
- **Category:** github
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

- **Version:** 1.5.8
- **Description:** Downloads an artifact for a GitHub repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  artifactId (Number, required) - The ID of the artifact
  -  path (String, required) - The path to save the artifact
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubDownloadJobLogs

- **Version:** 1.5.8
- **Description:** Downloads the logs for a specific job in a workflow run
- **Category:** github
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

- **Version:** 1.5.8
- **Description:** Downloads the logs for a workflow run
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  runId (Number, required) - The ID of the workflow run
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubFollowUser

- **Version:** 1.5.8
- **Description:** Follow the user
- **Category:** github
- **Arguments:**
  -  username (String, required) - The username of the user
- **Output:** Boolean
- **Brackets:** true
- **Unwrap:** true

## $githubGetArtifact

- **Version:** 1.5.8
- **Description:** Gets an artifact for a GitHub repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  artifactId (Number, required) - The ID of the artifact
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubGetBranch

- **Version:** 1.5.8
- **Description:** Gets a specific branch from a repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  branch (String, required) - The name of the branch
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubGetFileContent

- **Version:** 1.5.8
- **Description:** Gets the content of a file from a repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  path (String, required) - The path to the file
  -  ref (String) - Git reference (branch, commit, or tag)
- **Output:** String
- **Brackets:** true
- **Unwrap:** true

## $githubGetIssue

- **Version:** 1.5.8
- **Description:** Get a specific issue from a GitHub repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - Repository owner
  -  repo (String, required) - Repository name
  -  issue_number (Number, required) - Issue number
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubGetOrgs

- **Version:** 1.5.8
- **Description:** Get GitHub organizations
- **Category:** github
- **Arguments:**
  -  org (String, required) - The organization to get
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubGetPullReview

- **Version:** 1.5.8
- **Description:** Get a specific pull request review
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  pullNumber (Number, required) - The pull request number
  -  reviewId (Number, required) - The ID of the review
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubGetRelease

- **Version:** 1.5.8
- **Description:** Gets a release by its ID
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  releaseId (Number, required) - The ID of the release
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubGetRepo

- **Version:** 1.5.8
- **Description:** Gets a repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubGetTeam

- **Version:** 1.5.8
- **Description:** Get GitHub team
- **Category:** github
- **Arguments:**
  -  org (String, required) - The organization to get team for
  -  teamSlug (String, required) - The team slug
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubGetWorkflowJob

- **Version:** 1.5.8
- **Description:** Gets a specific job from a workflow run
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  jobId (Number, required) - The ID of the job
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubGetWorkflowRun

- **Version:** 1.5.8
- **Description:** Gets a workflow run for a GitHub repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  runId (Number, required) - The ID of the workflow run
  -  excludePullRequests (Boolean) - Excludes pull requests from the list of runs.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubListArtifacts

- **Version:** 1.5.8
- **Description:** Lists artifacts for a GitHub repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  artifactName (String) - The name of the artifact. When provided, only artifacts with this name will be returned.
  -  limit (Number) - The maximum number of artifacts to return.
  -  page (Number) - The page of artifacts to return.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubListBranches

- **Version:** 1.5.8
- **Description:** Lists branches for a repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  perPage (Number) - Number of results per page (default: 30, max: 100)
  -  page (Number) - Page number
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubListCollaborators

- **Version:** 1.5.8
- **Description:** Lists repository collaborators
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  affiliation (Enum): [Outside, Direct, All] - Filter collaborators by affiliation
  -  perPage (Number) - Results per page (max 100)
  -  page (Number) - Page number
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubListFollowers

- **Version:** 1.5.8
- **Description:** Get the followers of the user
- **Category:** github
- **Arguments:**
  -  username (String) - The username of the user
- **Output:** Json
- **Brackets:** false
- **Unwrap:** true

## $githubListFollowing

- **Version:** 1.5.8
- **Description:** Get the following of the user
- **Category:** github
- **Arguments:**
  -  username (String) - The username of the user
- **Output:** Json
- **Brackets:** false
- **Unwrap:** true

## $githubListIssueComments

- **Version:** 1.5.8
- **Description:** List comments on an issue
- **Category:** github
- **Arguments:**
  -  owner (String, required) - Repository owner
  -  repo (String, required) - Repository name
  -  issue_number (Number, required) - The issue number
  -  since (String) - Only show notifications updated after the given time
  -  per_page (Number) - Results per page (max 100)
  -  page (Number) - Page number of the results to fetch
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubListIssues

- **Version:** 1.5.8
- **Description:** List issues in a GitHub repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  milestone (String) - Milestone number, or * for issues with any milestone, or none for issues without milestones
  -  state (Enum): [OPEN, CLOSED, ALL] - State of the issues to return (open, closed, all)
  -  assignee (String) - Filter by assignee (username, * for assigned to any, none for no assignee)
  -  creator (String) - Filter by creator (username)
  -  mentioned (String) - Filter by mentioned user (username)
  -  labels (String) - Comma-separated list of label names
  -  sort (Enum): [CREATED, UPDATED, COMMENTS] - What to sort results by (created, updated, comments)
  -  direction (Enum): [ASC, DESC] - Direction of sort (asc, desc)
  -  since (String) - Only show notifications updated after the given time (ISO 8601 format)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubListMyIssues

- **Version:** 1.5.8
- **Description:** Lists issues assigned to the authenticated user across all repositories
- **Category:** github
- **Arguments:**
  -  filter (Enum): [Assigned, Created, Mentioned, Subscribed, All] - Filter to determine which issues are returned (assigned, created, mentioned, subscribed, all)
  -  state (Enum): [Open, Closed, All] - State of the issues to return (open, closed, all)
  -  labels (String) - Comma-separated list of label names to filter by
  -  sort (Enum): [Created, Updated, Comments] - How to sort the results (created, updated, comments)
  -  direction (Enum): [Asc, Desc] - Sort direction (asc, desc)
  -  since (String) - Only show notifications updated after the given time (ISO 8601 format)
  -  per_page (Number) - Results per page (max 100)
  -  page (Number) - Page number of the results to fetch
- **Output:** Json
- **Brackets:** false
- **Unwrap:** true

## $githubListOrgRepos

- **Version:** 1.5.8
- **Description:** Lists organization repositories
- **Category:** github
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

## $githubListOrgs

- **Version:** 1.5.8
- **Description:** List GitHub organizations
- **Category:** github
- **Arguments:**
  -  user (String) - The user to list organizations for
  -  per_page (Number) - The number of results per page
  -  page (Number) - The page number
- **Output:** Json
- **Brackets:** false
- **Unwrap:** true

## $githubListOrgsMembers

- **Version:** 1.5.8
- **Description:** List GitHub organization members
- **Category:** github
- **Arguments:**
  -  org (String, required) - The organization to list members for
  -  perPage (Number) - The number of results per page
  -  page (Number) - The page number
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubListPullReviews

- **Version:** 1.5.8
- **Description:** List reviews for a pull request
- **Category:** github
- **Arguments:**
  -  owner (String, required) - Repository owner
  -  repo (String, required) - Repository name
  -  pullNumber (Number, required) - The pull request number
  -  sort (Enum): [CREATED, UPDATED, CREATED_AT] - How to sort the results
  -  direction (Enum): [ASC, DESC] - Sort direction
  -  perPage (Number) - Results per page
  -  page (Number) - Page number of the results to fetch
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubListReleases

- **Version:** 1.5.8
- **Description:** Lists releases for a repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  perPage (Number) - Results per page (max 100)
  -  page (Number) - Page number
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubListRunArtifacts

- **Version:** 1.5.8
- **Description:** Lists artifacts for a workflow run
- **Category:** github
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

- **Version:** 1.5.8
- **Description:** Lists all self-hosted runners for a repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  perPage (Number) - Results per page (max 100)
  -  page (Number) - Page number of the results to fetch
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubListTeams

- **Version:** 1.5.8
- **Description:** List GitHub teams
- **Category:** github
- **Arguments:**
  -  org (String, required) - The organization to list teams for
  -  perPage (Number) - The number of results per page
  -  page (Number) - The page number
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubListUserRepos

- **Version:** 1.5.8
- **Description:** Lists repositories for a user
- **Category:** github
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

## $githubListWorkflowJobs

- **Version:** 1.5.8
- **Description:** Lists jobs for a workflow run
- **Category:** github
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

- **Version:** 1.5.8
- **Description:** Lists workflow runs for a GitHub repository
- **Category:** github
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

## $githubRemoveAssignees

- **Version:** 1.5.8
- **Description:** Remove assignees from a GitHub issue
- **Category:** github
- **Arguments:**
  -  owner (String, required) - Repository owner
  -  repo (String, required) - Repository name
  -  issue_number (Number, required) - The issue number
  -  assignees (String, required) - Comma-separated list of usernames to remove as assignees
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubRemoveCollaborator

- **Version:** 1.5.8
- **Description:** Removes a collaborator from a repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  username (String, required) - GitHub username of the collaborator
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubRemoveLabel

- **Version:** 1.5.8
- **Description:** Remove a label from an issue in a GitHub repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - Repository owner
  -  repo (String, required) - Repository name
  -  issue_number (Number, required) - Issue number
  -  name (String, required) - Label name to remove
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubRemoveRunnerLabelRepo

- **Version:** 1.5.8
- **Description:** Removes a custom label from a self-hosted runner for a repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  runnerId (Number, required) - The ID of the self-hosted runner
  -  name (String, required) - The name of the label to remove
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubRerunFailedJobs

- **Version:** 1.5.8
- **Description:** Reruns all failed jobs in a workflow run
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  runId (Number, required) - The ID of the workflow run
  -  enableDebugLogging (Boolean) - Whether to enable debug logging for the re-run
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubRerunWorkflow

- **Version:** 1.5.8
- **Description:** Reruns a workflow run for a GitHub repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  runId (Number, required) - The ID of the workflow run
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubSearchCode

- **Version:** 1.5.8
- **Description:** Search GitHub for code
- **Category:** github
- **Arguments:**
  -  query (String, required) - The search query
  -  order (Enum, required): [Asc, Desc] - The order of the results
  -  page (Number, required) - The page of the results
  -  per_page (Number, required) - The number of results per page
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubSearchCommits

- **Version:** 1.5.8
- **Description:** Search GitHub for commits
- **Category:** github
- **Arguments:**
  -  query (String, required) - The search query
  -  sort (Enum, required): [AuthorDate, CommitterDate] - The sort order
  -  order (Enum, required): [Asc, Desc] - The order of the results
  -  page (Number, required) - The page of the results
  -  per_page (Number, required) - The number of results per page
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubSearchLabels

- **Version:** 1.5.8
- **Description:** Search GitHub for labels
- **Category:** github
- **Arguments:**
  -  repository_id (Number, required) - The ID of the repository to search in
  -  query (String, required) - The search query
  -  sort (Enum, required): [Updated, Created] - The sort order
  -  order (Enum, required): [Asc, Desc] - The order of the results
  -  page (Number, required) - The page of the results
  -  per_page (Number, required) - The number of results per page
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubSearchRepo

- **Version:** 1.5.8
- **Description:** Search GitHub for repositories
- **Category:** github
- **Arguments:**
  -  query (String, required) - The search query
  -  sort (Enum, required): [Stars, Forks, HelpWantedIssues, Updated] - The sort order
  -  order (Enum, required): [Asc, Desc] - The order of the results
  -  page (Number, required) - The page of the results
  -  per_page (Number, required) - The number of results per page
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubSearchTopics

- **Version:** 1.5.8
- **Description:** Search GitHub for topics
- **Category:** github
- **Arguments:**
  -  query (String, required) - The search query
  -  sort (Enum, required): [Updated, Created] - The sort order
  -  order (Enum, required): [Asc, Desc] - The order of the results
  -  page (Number, required) - The page of the results
  -  per_page (Number, required) - The number of results per page
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubSearchUsers

- **Version:** 1.5.8
- **Description:** Search GitHub for users
- **Category:** github
- **Arguments:**
  -  query (String, required) - The search query
  -  sort (Enum, required): [Followers, Repos, Joined] - The sort order
  -  order (Enum, required): [Asc, Desc] - The order of the results
  -  page (Number, required) - The page of the results
  -  per_page (Number, required) - The number of results per page
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubUnfollowUser

- **Version:** 1.5.8
- **Description:** Unfollow the user
- **Category:** github
- **Arguments:**
  -  username (String, required) - The username of the user
- **Output:** Boolean
- **Brackets:** true
- **Unwrap:** true

## $githubUnprotectBranch

- **Version:** 1.5.8
- **Description:** Removes branch protection from a repository branch
- **Category:** github
- **Arguments:**
  -  owner (String, required) - The owner of the repository
  -  repo (String, required) - The name of the repository
  -  branch (String, required) - The name of the branch to unprotect
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubUpdateComment

- **Version:** 1.5.8
- **Description:** Update a comment on an issue or pull request
- **Category:** github
- **Arguments:**
  -  owner (String, required) - Repository owner
  -  repo (String, required) - Repository name
  -  comment_id (Number, required) - The ID of the comment to update
  -  body (String, required) - The updated contents of the comment
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubUpdateFile

- **Version:** 1.5.8
- **Description:** Creates or updates a file in a repository
- **Category:** github
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

## $githubUpdateIssue

- **Version:** 1.5.8
- **Description:** Update an existing issue in a GitHub repository
- **Category:** github
- **Arguments:**
  -  owner (String, required) - Repository owner
  -  repo (String, required) - Repository name
  -  issue_number (Number, required) - Issue number
  -  title (String) - New issue title
  -  body (String) - New issue description
  -  assignee (String) - GitHub username of the assignee
  -  assignees (String) - List of assignees (comma-separated)
  -  labels (String) - List of labels (comma-separated)
  -  milestone (Number) - Milestone number
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubUpdatePullReview

- **Version:** 1.5.8
- **Description:** Update the body text of a review that has not been submitted
- **Category:** github
- **Arguments:**
  -  owner (String, required) - Repository owner
  -  repo (String, required) - Repository name
  -  pullNumber (Number, required) - The pull request number
  -  reviewId (Number, required) - The ID of the review
  -  body (String, required) - The updated body text of the review
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $githubUpdateRelease

- **Version:** 1.5.8
- **Description:** Updates an existing GitHub release
- **Category:** github
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

- **Version:** 1.5.8
- **Description:** Updates a repository
- **Category:** github
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

- **Version:** 1.5.8
- **Description:** Uploads an asset to a GitHub release
- **Category:** github
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

## $getRandomSubreddit

- **Version:** 1.0.0
- **Description:** Get Random Subreddits info
- **Category:** reddit
- **Arguments:**
  -  filter (Enum): [popular, new] - Filter subreddit list by 'popular' or 'new'
  -  limit (Number) - Maximum number of subreddits to return (max 25)
- **Output:** Json
- **Brackets:** false
- **Unwrap:** true

## $getSubreddit

- **Version:** 1.0.0
- **Description:** Get the subreddit about page of the name you gave
- **Category:** reddit
- **Arguments:**
  -  subreddit (String, required, rest) - The subreddit to get the about page of
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getSubredditFeed

- **Version:** 1.0.0
- **Description:** Get the readable subreddit feed (title, author, upvotes, etc)
- **Category:** reddit
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
- **Category:** reddit
- **Arguments:**
  -  subreddit (String, required) - The subreddit to get the rules for
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $trackSubredditsList

- **Version:** 1.0.0
- **Description:** Returns all active tracked subreddits
- **Category:** reddit
- **Output:** Json
- **Unwrap:** false

## $getUser

- **Version:** 1.0.0
- **Description:** Get the users info about page of the name you gave
- **Category:** reddit
- **Arguments:**
  -  username (String, required, rest) - The username to get the info of (without u/)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getUserActivity

- **Version:** 1.0.0
- **Description:** Get the users activity page of the name you gave
- **Category:** reddit
- **Arguments:**
  -  username (String, required, rest) - The username to get the activity of (without u/)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getUserComments

- **Version:** 1.0.0
- **Description:** Get the users comments page of the name you gave
- **Category:** reddit
- **Arguments:**
  -  username (String, required, rest) - The username to get the comments of (without u/)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getUserOverview

- **Version:** 1.0.0
- **Description:** Get the users overview
- **Category:** reddit
- **Arguments:**
  -  username (String, required, rest) - The username to get the overview of (without u/)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getUserSubmissions

- **Version:** 1.0.0
- **Description:** Get the users submissions page of the name you gave
- **Category:** reddit
- **Arguments:**
  -  username (String, required, rest) - The username to get the submissions of (without u/)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getUserTrophies

- **Version:** 1.0.0
- **Description:** Get the users trophies
- **Category:** reddit
- **Arguments:**
  -  username (String, required, rest) - The username to get the trophies of (without u/)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getWiki

- **Version:** 1.0.0
- **Description:** Get the subreddit wiki index page of the name you gave
- **Category:** reddit
- **Arguments:**
  -  subreddit (String, required, rest) - The subreddit to get the wiki index page of
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getWikiPage

- **Version:** 1.0.0
- **Description:** Get the subreddit wiki page. 
- **Category:** reddit
- **Arguments:**
  -  subreddit (String, required) - The subreddit to get the wiki pages of
  -  page (String) - The page name to get
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $getWikiRevisions

- **Version:** 1.0.0
- **Description:** Get the subreddit wiki page revisions. Returns all revisions if page not specified. 
- **Category:** reddit
- **Arguments:**
  -  subreddit (String, required) - The subreddit to get the wiki revisions of
  -  page (String) - The page name to get the revisions of
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

## $removeTrackedSubreddit

- **Version:** 1.0.0
- **Description:** Returns removes subreddit from tracking
- **Category:** reddit
- **Arguments:**
  -  name (String, required) - subreddit name
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $searchSubredditPosts

- **Version:** 1.0.0
- **Description:** Search for posts within a specific subreddit
- **Category:** reddit
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
- **Category:** reddit
- **Arguments:**
  -  subreddit (String, required) - The subreddit to track
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyCheckCurrentUserFollows

- **Version:** 1.0.0
- **Description:** Check If User Follows Artists or Users
- **Category:** spotify
- **Arguments:**
  -  type (String, required) - The ID type: either `artist` or `user`.
  -  ids (String, required) - A comma-separated list of the artist or the user [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) to check. For example: `ids=74ASZWbe4lXaubB36ztrGX,08td7MxkoHQkXnWAYD8d6Q`. A maximum of 50 IDs can be sent in one request.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyCheckIfUserFollowsPlaylist

- **Version:** 1.0.0
- **Description:** Check if Current User Follows Playlist
- **Category:** spotify
- **Arguments:**
  -  playlist_id (String, required) - The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.
  -  ids (String) - **Deprecated** A single item list containing current user's [Spotify Username](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 1 id.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyCheckUsersSavedAlbums

- **Version:** 1.0.0
- **Description:** Check User's Saved Albums
- **Category:** spotify
- **Arguments:**
  -  ids (String, required) - A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyCheckUsersSavedAudiobooks

- **Version:** 1.0.0
- **Description:** Check User's Saved Audiobooks
- **Category:** spotify
- **Arguments:**
  -  ids (String, required) - A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyCheckUsersSavedEpisodes

- **Version:** 1.0.0
- **Description:** Check User's Saved Episodes
- **Category:** spotify
- **Arguments:**
  -  ids (String, required) - A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyCheckUsersSavedShows

- **Version:** 1.0.0
- **Description:** Check User's Saved Shows
- **Category:** spotify
- **Arguments:**
  -  ids (String, required) - A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyCheckUsersSavedTracks

- **Version:** 1.0.0
- **Description:** Check User's Saved Tracks
- **Category:** spotify
- **Arguments:**
  -  ids (String, required) - A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetACategoriesPlaylists

- **Version:** 1.0.0
- **Description:** Get Category's Playlists
- **Category:** spotify
- **Arguments:**
  -  category_id (String, required) - The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.
  -  limit (Number) - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
  -  offset (Number) - The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetACategory

- **Version:** 1.0.0
- **Description:** Get Single Browse Category
- **Category:** spotify
- **Arguments:**
  -  category_id (String, required) - The [Spotify category ID](/documentation/web-api/concepts/spotify-uris-ids) for the category.
  -  locale (String) - The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetAChapter

- **Version:** 1.0.0
- **Description:** Get a Chapter
- **Category:** spotify
- **Arguments:**
  -  id (String, required) - The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetAListOfCurrentUsersPlaylists

- **Version:** 1.0.0
- **Description:** Get Current User's Playlists
- **Category:** spotify
- **Arguments:**
  -  limit (Number) - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
  -  offset (Number) - 'The index of the first playlist to return. Default:
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetAShow

- **Version:** 1.0.0
- **Description:** Get Show
- **Category:** spotify
- **Arguments:**
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
  -  id (String, required) - The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetAShowsEpisodes

- **Version:** 1.0.0
- **Description:** Get Show Episodes
- **Category:** spotify
- **Arguments:**
  -  id (String, required) - The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
  -  limit (Number) - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
  -  offset (Number) - The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetAUsersAvailableDevices

- **Version:** 1.0.0
- **Description:** Get Available Devices
- **Category:** spotify
- **Output:** Json
- **Brackets:** false
- **Unwrap:** false

## $spotifyGetAnAlbum

- **Version:** 1.0.0
- **Description:** Get Album
- **Category:** spotify
- **Arguments:**
  -  id (String, required) - The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the album.
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetAnAlbumsTracks

- **Version:** 1.0.0
- **Description:** Get Album Tracks
- **Category:** spotify
- **Arguments:**
  -  id (String, required) - The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the album.
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
  -  limit (Number) - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
  -  offset (Number) - The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetAnArtist

- **Version:** 1.0.0
- **Description:** Get Artist
- **Category:** spotify
- **Arguments:**
  -  id (String, required) - The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetAnArtistsAlbums

- **Version:** 1.0.0
- **Description:** Get Artist's Albums
- **Category:** spotify
- **Arguments:**
  -  id (String, required) - The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.
  -  include_groups (Enum): [album, single, appears_on, compilation] - A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. <br/>
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
  -  limit (Number) - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
  -  offset (Number) - The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetAnArtistsRelatedArtists

- **Version:** 1.0.0
- **Description:** Get Artist's Related Artists
- **Category:** spotify
- **Arguments:**
  -  id (String, required) - The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetAnArtistsTopTracks

- **Version:** 1.0.0
- **Description:** Get Artist's Top Tracks
- **Category:** spotify
- **Arguments:**
  -  id (String, required) - The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetAnAudiobook

- **Version:** 1.0.0
- **Description:** Get an Audiobook
- **Category:** spotify
- **Arguments:**
  -  id (String, required) - The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetAnEpisode

- **Version:** 1.0.0
- **Description:** Get Episode
- **Category:** spotify
- **Arguments:**
  -  id (String, required) - The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the episode.
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetAudioAnalysis

- **Version:** 1.0.0
- **Description:** Get Track's Audio Analysis
- **Category:** spotify
- **Arguments:**
  -  id (String, required) - The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetAudioFeatures

- **Version:** 1.0.0
- **Description:** Get Track's Audio Features
- **Category:** spotify
- **Arguments:**
  -  id (String, required) - The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetAudiobookChapters

- **Version:** 1.0.0
- **Description:** Get Audiobook Chapters
- **Category:** spotify
- **Arguments:**
  -  id (String, required) - The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
  -  limit (Number) - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
  -  offset (Number) - The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetAvailableMarkets

- **Version:** 1.0.0
- **Description:** Get Available Markets
- **Category:** spotify
- **Output:** Json
- **Brackets:** false
- **Unwrap:** false

## $spotifyGetCategories

- **Version:** 1.0.0
- **Description:** Get Several Browse Categories
- **Category:** spotify
- **Arguments:**
  -  locale (String) - The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._
  -  limit (Number) - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
  -  offset (Number) - The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetCurrentUsersProfile

- **Version:** 1.0.0
- **Description:** Get Current User's Profile
- **Category:** spotify
- **Output:** Json
- **Brackets:** false
- **Unwrap:** false

## $spotifyGetFeaturedPlaylists

- **Version:** 1.0.0
- **Description:** Get Featured Playlists
- **Category:** spotify
- **Arguments:**
  -  locale (String) - The desired language, consisting of an [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1) language code and an [ISO 3166-1 alpha-2 country code](http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2), joined by an underscore. For example: `es_MX`, meaning &quot;Spanish (Mexico)&quot;. Provide this parameter if you want the category strings returned in a particular language.<br/> _**Note**: if `locale` is not supplied, or if the specified language is not available, the category strings returned will be in the Spotify default language (American English)._
  -  limit (Number) - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
  -  offset (Number) - The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetFollowed

- **Version:** 1.0.0
- **Description:** Get Followed Artists
- **Category:** spotify
- **Arguments:**
  -  type (String, required) - The ID type: currently only `artist` is supported.
  -  after (String) - The last artist ID retrieved from the previous request.
  -  limit (Number) - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetInformationAboutTheUsersCurrentPlayback

- **Version:** 1.0.0
- **Description:** Get Playback State
- **Category:** spotify
- **Arguments:**
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
  -  additional_types (String) - A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetListUsersPlaylists

- **Version:** 1.0.0
- **Description:** Get User's Playlists
- **Category:** spotify
- **Arguments:**
  -  user_id (String, required) - The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).
  -  limit (Number) - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
  -  offset (Number) - The index of the first playlist to return. Default:
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetMultipleAlbums

- **Version:** 1.0.0
- **Description:** Get Several Albums
- **Category:** spotify
- **Arguments:**
  -  ids (String, required) - A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetMultipleArtists

- **Version:** 1.0.0
- **Description:** Get Several Artists
- **Category:** spotify
- **Arguments:**
  -  ids (String, required) - A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the artists. Maximum: 50 IDs.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetMultipleAudiobooks

- **Version:** 1.0.0
- **Description:** Get Several Audiobooks
- **Category:** spotify
- **Arguments:**
  -  ids (String, required) - A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetMultipleEpisodes

- **Version:** 1.0.0
- **Description:** Get Several Episodes
- **Category:** spotify
- **Arguments:**
  -  ids (String, required) - A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the episodes. Maximum: 50 IDs.
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetMultipleShows

- **Version:** 1.0.0
- **Description:** Get Several Shows
- **Category:** spotify
- **Arguments:**
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
  -  ids (String, required) - A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetNewReleases

- **Version:** 1.0.0
- **Description:** Get New Releases
- **Category:** spotify
- **Arguments:**
  -  limit (Number) - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
  -  offset (Number) - The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetPlaylist

- **Version:** 1.0.0
- **Description:** Get Playlist
- **Category:** spotify
- **Arguments:**
  -  playlist_id (String, required) - The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
  -  fields (String) - Filters for the query: a comma-separated list of the
  -  additional_types (String) - A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetPlaylistCover

- **Version:** 1.0.0
- **Description:** Get Playlist Cover Image
- **Category:** spotify
- **Arguments:**
  -  playlist_id (String, required) - The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetPlaylistsTracks

- **Version:** 1.0.0
- **Description:** Get Playlist Items
- **Category:** spotify
- **Arguments:**
  -  playlist_id (String, required) - The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
  -  fields (String) - Filters for the query: a comma-separated list of the
  -  limit (Number) - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
  -  offset (Number) - The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
  -  additional_types (String) - A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetQueue

- **Version:** 1.0.0
- **Description:** Get the User's Queue
- **Category:** spotify
- **Output:** Json
- **Brackets:** false
- **Unwrap:** false

## $spotifyGetRecentlyPlayed

- **Version:** 1.0.0
- **Description:** Get Recently Played Tracks
- **Category:** spotify
- **Arguments:**
  -  limit (Number) - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
  -  after (Number) - A Unix timestamp in milliseconds. Returns all items
  -  before (Number) - A Unix timestamp in milliseconds. Returns all items
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetRecommendationGenres

- **Version:** 1.0.0
- **Description:** Get Available Genre Seeds
- **Category:** spotify
- **Output:** Json
- **Brackets:** false
- **Unwrap:** false

## $spotifyGetRecommendations

- **Version:** 1.0.0
- **Description:** Get Recommendations
- **Category:** spotify
- **Arguments:**
  -  limit (Number) - The target size of the list of recommended tracks. For seeds with unusually small pools or when highly restrictive filtering is applied, it may be impossible to generate the requested number of recommended tracks. Debugging information for such cases is available in the response. Default: 20. Minimum: 1. Maximum: 100.
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
  -  seed_artists (String, required) - A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for seed artists.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_genres` and `seed_tracks` are not set_.
  -  seed_genres (String, required) - A comma separated list of any genres in the set of [available genre seeds](/documentation/web-api/reference/get-recommendation-genres). Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists` and `seed_tracks` are not set_.
  -  seed_tracks (String, required) - A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for a seed track.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists` and `seed_genres` are not set_.
  -  min_acousticness (Number) - For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.
  -  max_acousticness (Number) - For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.
  -  target_acousticness (Number) - For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.
  -  min_danceability (Number) - For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.
  -  max_danceability (Number) - For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.
  -  target_danceability (Number) - For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.
  -  min_duration_ms (Number) - For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.
  -  max_duration_ms (Number) - For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.
  -  target_duration_ms (Number) - Target duration of the track (ms)
  -  min_energy (Number) - For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.
  -  max_energy (Number) - For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.
  -  target_energy (Number) - For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.
  -  min_instrumentalness (Number) - For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.
  -  max_instrumentalness (Number) - For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.
  -  target_instrumentalness (Number) - For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.
  -  min_key (Number) - For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.
  -  max_key (Number) - For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.
  -  target_key (Number) - For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.
  -  min_liveness (Number) - For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.
  -  max_liveness (Number) - For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.
  -  target_liveness (Number) - For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.
  -  min_loudness (Number) - For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.
  -  max_loudness (Number) - For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.
  -  target_loudness (Number) - For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.
  -  min_mode (Number) - For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.
  -  max_mode (Number) - For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.
  -  target_mode (Number) - For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.
  -  min_popularity (Number) - For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.
  -  max_popularity (Number) - For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.
  -  target_popularity (Number) - For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.
  -  min_speechiness (Number) - For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.
  -  max_speechiness (Number) - For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.
  -  target_speechiness (Number) - For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.
  -  min_tempo (Number) - For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.
  -  max_tempo (Number) - For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.
  -  target_tempo (Number) - Target tempo (BPM)
  -  min_time_signature (Number) - For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.
  -  max_time_signature (Number) - For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.
  -  target_time_signature (Number) - For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.
  -  min_valence (Number) - For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.
  -  max_valence (Number) - For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.
  -  target_valence (Number) - For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetSeveralAudioFeatures

- **Version:** 1.0.0
- **Description:** Get Several Tracks' Audio Features
- **Category:** spotify
- **Arguments:**
  -  ids (String, required) - A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetSeveralChapters

- **Version:** 1.0.0
- **Description:** Get Several Chapters
- **Category:** spotify
- **Arguments:**
  -  ids (String, required) - A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU`. Maximum: 50 IDs.
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetSeveralTracks

- **Version:** 1.0.0
- **Description:** Get Several Tracks
- **Category:** spotify
- **Arguments:**
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
  -  ids (String, required) - A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetTheUsersCurrentlyPlayingTrack

- **Version:** 1.0.0
- **Description:** Get Currently Playing Track
- **Category:** spotify
- **Arguments:**
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
  -  additional_types (String) - A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetTrack

- **Version:** 1.0.0
- **Description:** Get Track
- **Category:** spotify
- **Arguments:**
  -  id (String, required) - The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetUsersProfile

- **Version:** 1.0.0
- **Description:** Get User's Profile
- **Category:** spotify
- **Arguments:**
  -  user_id (String, required) - The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetUsersSavedAlbums

- **Version:** 1.0.0
- **Description:** Get User's Saved Albums
- **Category:** spotify
- **Arguments:**
  -  limit (Number) - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
  -  offset (Number) - The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetUsersSavedAudiobooks

- **Version:** 1.0.0
- **Description:** Get User's Saved Audiobooks
- **Category:** spotify
- **Arguments:**
  -  limit (Number) - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
  -  offset (Number) - The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetUsersSavedEpisodes

- **Version:** 1.0.0
- **Description:** Get User's Saved Episodes
- **Category:** spotify
- **Arguments:**
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
  -  limit (Number) - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
  -  offset (Number) - The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetUsersSavedShows

- **Version:** 1.0.0
- **Description:** Get User's Saved Shows
- **Category:** spotify
- **Arguments:**
  -  limit (Number) - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
  -  offset (Number) - The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetUsersSavedTracks

- **Version:** 1.0.0
- **Description:** Get User's Saved Tracks
- **Category:** spotify
- **Arguments:**
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
  -  limit (Number) - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
  -  offset (Number) - The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifyGetUsersTopArtistsAndTracks

- **Version:** 1.0.0
- **Description:** Get User's Top Items
- **Category:** spotify
- **Arguments:**
  -  type (String, required) - The type of entity to return. Valid values: `artists` or `tracks`
  -  time_range (Enum): [long_term, medium_term, short_term] - Over what time frame the affinities are computed. Valid values: `long_term` (calculated from ~1 year of data and including all new data as it becomes available), `medium_term` (approximately last 6 months), `short_term` (approximately last 4 weeks). Default: `medium_term`
  -  limit (Number) - The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
  -  offset (Number) - The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $spotifySearch

- **Version:** 1.0.0
- **Description:** Search for Item
- **Category:** spotify
- **Arguments:**
  -  q (String, required) - Your search query.
  -  type (Enum, required): [album, artist, playlist, track, show, episode, audiobook] - A comma-separated list of item types to search across. Search results include hits
  -  market (String) - An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
  -  limit (Number) - The maximum number of results to return in each item type.
  -  offset (Number) - The index of the first result to return. Use
  -  include_external (String) - If `include_external=audio` is specified it signals that the client can play externally hosted audio content, and marks
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

## $youtubeGetComments

- **Version:** 1.5.8
- **Description:** Get comments for a YouTube video
- **Category:** youtube
- **Arguments:**
  -  videoId (String, required) - The ID of the video to get comments from
  -  sortBy (Enum): [NewestFirst, TopComments] - Sort order of comments (TOP_COMMENTS, NEWEST_FIRST)
  -  commentId (String) - The ID of a specific comment to get replies for
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $youtubeGetPost

- **Version:** 1.5.8
- **Description:** Get a YouTube community post by ID
- **Category:** youtube
- **Arguments:**
  -  postId (String, required) - The ID of the community post to retrieve
  -  channelId (String, required) - The ID of the channel that owns the post
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $youtubeGetPostComments

- **Version:** 1.5.8
- **Description:** Get comments for a YouTube community post
- **Category:** youtube
- **Arguments:**
  -  postId (String, required) - The ID of the community post
  -  channelId (String, required) - The ID of the channel that owns the post
  -  sortBy (Enum): [NewestFirst, TopComments] - Sort order of comments (TOP_COMMENTS, NEWEST_FIRST)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $listTrackedYoutubeChannels

- **Version:** 1.0.0
- **Description:** Returns a list of all tracked YouTube channel IDs.
- **Category:** youtube
- **Unwrap:** false

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

## $youtubeDownload

- **Version:** 1.5.8
- **Description:** Downloads a YouTube video to a file.
- **Category:** youtube
- **Arguments:**
  -  video_id (String, required) - The video ID to download.
  -  path (String, required) - The file path to save the video.
  -  client (Enum): [IOS, Web, MWEB, ANDROID, YTMUSIC, YTMUSIC_ANDROID, YTSTUDIO_ANDROID, TV, TV_SIMPLY, TV_EMBEDDED, YTKIDS, WEB_EMBEDDED, WEB_CREATOR] - The client to use for downloading.
  -  itag (Enum): [FLV_240p, FLV_270p, _3GP_144p, MP4_360p, MP4_720p, FLV_360p, FLV_480p, _3GP_180p, MP4_1080p, MP4_3072p, WebM_360p, WebM_480p, WebM_720p, WebM_1080p, MP4_360p_3D, MP4_480p_3D, MP4_720p_3D, MP4_1080p_3D, HLS_240p_3D, HLS_360p_3D, HLS_480p_3D, HLS_720p_3D, HLS_1080p, WebM_360p_3D, WebM_480p_3D, WebM_720p_3D, MP4_240p, MP4_240p_2, MP4_360p_2, MP4_480p_2, MP4_720p_2, MP4_1080p_2, MP4_2160p60, M4A_48kbps, M4A_128kbps, M4A_256kbps, HLS_72p, MP4_144p, WebM_360p_2, WebM_480p_2, WebM_1080p_2, WebM_Opus128, WebM_480p_3, WebM_144p_3, WebM_240p, WebM_360p_3, WebM_480p_4, WebM_480p_5, WebM_480p_6, WebM_720p_2, WebM_1080p_3, WebM_Opus50, WebM_Opus70, WebM_Opus160, MP4_1440p, MP4_2160p60_2, WebM_1440p_2, WebM_4320p, WebM_144p_4, MP4_720p60, MP4_1080p60, WebM_720p60_2, WebM_1080p60_2, WebM_1440p60, WebM_2160p, WebM_2160p60_2, WebM_144p60_HDR, WebM_240p60_HDR, WebM_360p60_HDR, WebM_480p60_HDR, WebM_720p60_HDR, WebM_1080p60_HDR, WebM_1440p60_HDR, WebM_2160p60_HDR] - The itag to get streaming data for.
  -  quality (Enum): [P144, P240, P360, P480, P720, P1080, P1440, P2160, P4320, Best, BestEfficiency] - The quality to get streaming data for.
  -  type (Enum): [Video, Audio, VideoAudio] - The type to get streaming data for.
  -  language (String) - The language to get streaming data for.
  -  format (String) - The format to get streaming data for.
  -  codec (Enum): [AVC, VP9, AV1, OPUS, MP4A, H264, VP8] - Video or audio codec identifier for the stream
- **Brackets:** true
- **Unwrap:** true

## $youtubeGetAttestationChallenge

- **Version:** 1.5.8
- **Description:** Gets an attestation challenge for YouTube.
- **Category:** youtube
- **Arguments:**
  -  engagement_type (Enum, required): [EngagementTypeUnbound, EngagementTypeVideoLike, EngagementTypeVideoDislike, EngagementTypeSubscribe, EngagementTypePlayback, EngagementTypeYpcGetPremiumPage, EngagementTypeYpcGetDownloadAction] - The engagement type to get an attestation challenge for.
  -  ids (String, rest) - The IDs to get an attestation challenge for.
- **Brackets:** true
- **Unwrap:** true

## $youtubeGetBasicInfo

- **Version:** 1.5.8
- **Description:** Retrieves basic information about a YouTube video.
- **Category:** youtube
- **Arguments:**
  -  videoId (String, required) - The ID of the video to retrieve information for.
- **Brackets:** true
- **Unwrap:** true

## $youtubeGetChannel

- **Version:** 1.5.8
- **Description:** Get a YouTube channel by ID
- **Category:** youtube
- **Arguments:**
  -  id (String, required) - The ID of the channel to get
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $youtubeGetChannelsFeed

- **Version:** 1.5.8
- **Description:** Get channels feed from YouTube
- **Category:** youtube
- **Output:** Json
- **Unwrap:** false

## $youtubeGetCourses

- **Version:** 1.5.8
- **Description:** Get YouTube courses
- **Category:** youtube
- **Output:** Json
- **Unwrap:** false

## $youtubeGetGuide

- **Version:** 1.5.8
- **Description:** Get the guide of YouTube
- **Category:** youtube
- **Output:** Json
- **Unwrap:** false

## $youtubeGetHashtag

- **Version:** 1.5.8
- **Description:** Get a YouTube hashtag page
- **Category:** youtube
- **Arguments:**
  -  hashtag (String, required) - The hashtag to search for (without #)
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $youtubeGetHistory

- **Version:** 1.5.8
- **Description:** Get the user's watch history from YouTube
- **Category:** youtube
- **Output:** Json
- **Unwrap:** false

## $youtubeGetHomeFeed

- **Version:** 1.5.8
- **Description:** Get the home feed of YouTube
- **Category:** youtube
- **Output:** Json
- **Unwrap:** false

## $youtubeGetInfo

- **Version:** 1.5.8
- **Description:** Retrieves information about a YouTube video.
- **Category:** youtube
- **Arguments:**
  -  videoId (String, required) - The ID of the video to retrieve information for.
- **Brackets:** true
- **Unwrap:** true

## $youtubeGetLibrary

- **Version:** 1.5.8
- **Description:** Get the user's YouTube library
- **Category:** youtube
- **Output:** Json
- **Unwrap:** false

## $youtubeGetNotifications

- **Version:** 1.5.8
- **Description:** Get notifications from YouTube
- **Category:** youtube
- **Output:** Json
- **Unwrap:** false

## $youtubeGetPlaylist

- **Version:** 1.5.8
- **Description:** Get a YouTube playlist by ID
- **Category:** youtube
- **Arguments:**
  -  id (String, required) - The ID of the playlist to get
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $youtubeGetPlaylists

- **Version:** 1.5.8
- **Description:** Get YouTube playlists
- **Category:** youtube
- **Output:** Json
- **Unwrap:** false

## $youtubeGetSearchSuggestions

- **Version:** 1.5.8
- **Description:** Gets search suggestions.
- **Category:** youtube
- **Arguments:**
  -  query (String, required) - The query to get search suggestions for.
  -  previousQuery (String) - The previous query to get search suggestions for.
- **Brackets:** true
- **Unwrap:** true

## $youtubeGetShortsVideoInfo

- **Version:** 1.5.8
- **Description:** Retrieves information about a YouTube Shorts video.
- **Category:** youtube
- **Arguments:**
  -  videoId (String, required) - The ID of the video to retrieve information for.
  -  client (Enum): [IOS, Web, MWEB, ANDROID, YTMUSIC, YTMUSIC_ANDROID, YTSTUDIO_ANDROID, TV, TV_SIMPLY, TV_EMBEDDED, YTKIDS, WEB_EMBEDDED, WEB_CREATOR] - The client to use.
- **Brackets:** true
- **Unwrap:** true

## $youtubeGetStreamingData

- **Version:** 1.5.8
- **Description:** Gets streaming data.
- **Category:** youtube
- **Arguments:**
  -  video_id (String, required) - The video ID to get streaming data for.
  -  itag (Enum): [FLV_240p, FLV_270p, _3GP_144p, MP4_360p, MP4_720p, FLV_360p, FLV_480p, _3GP_180p, MP4_1080p, MP4_3072p, WebM_360p, WebM_480p, WebM_720p, WebM_1080p, MP4_360p_3D, MP4_480p_3D, MP4_720p_3D, MP4_1080p_3D, HLS_240p_3D, HLS_360p_3D, HLS_480p_3D, HLS_720p_3D, HLS_1080p, WebM_360p_3D, WebM_480p_3D, WebM_720p_3D, MP4_240p, MP4_240p_2, MP4_360p_2, MP4_480p_2, MP4_720p_2, MP4_1080p_2, MP4_2160p60, M4A_48kbps, M4A_128kbps, M4A_256kbps, HLS_72p, MP4_144p, WebM_360p_2, WebM_480p_2, WebM_1080p_2, WebM_Opus128, WebM_480p_3, WebM_144p_3, WebM_240p, WebM_360p_3, WebM_480p_4, WebM_480p_5, WebM_480p_6, WebM_720p_2, WebM_1080p_3, WebM_Opus50, WebM_Opus70, WebM_Opus160, MP4_1440p, MP4_2160p60_2, WebM_1440p_2, WebM_4320p, WebM_144p_4, MP4_720p60, MP4_1080p60, WebM_720p60_2, WebM_1080p60_2, WebM_1440p60, WebM_2160p, WebM_2160p60_2, WebM_144p60_HDR, WebM_240p60_HDR, WebM_360p60_HDR, WebM_480p60_HDR, WebM_720p60_HDR, WebM_1080p60_HDR, WebM_1440p60_HDR, WebM_2160p60_HDR] - Theitag to get streaming data for.
  -  quality (Enum): [P144, P240, P360, P480, P720, P1080, P1440, P2160, P4320, Best, BestEfficiency] - The quality to get streaming data for.
  -  type (Enum): [Video, Audio, VideoAudio] - The type to get streaming data for.
  -  language (String) - The language to get streaming data for.
  -  format (String) - The format to get streaming data for.
  -  codec (Enum): [AVC, VP9, AV1, OPUS, MP4A, H264, VP8] - Video or audio codec identifier for the stream
- **Brackets:** true
- **Unwrap:** true

## $youtubeGetSubscriptionsFeed

- **Version:** 1.5.8
- **Description:** Get the subscriptions feed from YouTube
- **Category:** youtube
- **Output:** Json
- **Unwrap:** false

## $youtubeGetTrending

- **Version:** 1.5.8
- **Description:** Get trending videos from YouTube
- **Category:** youtube
- **Output:** Json
- **Unwrap:** false

## $youtubeGetUnseenNotificationsCount

- **Version:** 1.5.8
- **Description:** Get the count of unseen YouTube notifications
- **Category:** youtube
- **Output:** Number
- **Unwrap:** false

## $youtubePlaylistAddToLibrary

- **Version:** 1.5.8
- **Description:** Add a playlist to the library
- **Category:** youtube
- **Arguments:**
  -  playlistId (String, required) - The ID of the playlist to add to library
- **Output:** Boolean
- **Brackets:** true
- **Unwrap:** true

## $youtubePlaylistAddVideos

- **Version:** 1.5.8
- **Description:** Add videos to a YouTube playlist
- **Category:** youtube
- **Arguments:**
  -  playlistId (String, required) - The ID of the playlist to add videos to
  -  videoIds (String, required, rest) - Video IDs to add to the playlist
- **Output:** Boolean
- **Brackets:** true
- **Unwrap:** true

## $youtubePlaylistCreate

- **Version:** 1.5.8
- **Description:** Create a new YouTube playlist
- **Category:** youtube
- **Arguments:**
  -  title (String, required) - The title of the new playlist
  -  videoIds (String, rest) - video IDs to add to the playlist
- **Output:** Json
- **Brackets:** true
- **Unwrap:** true

## $youtubePlaylistDelete

- **Version:** 1.5.8
- **Description:** Delete a YouTube playlist
- **Category:** youtube
- **Arguments:**
  -  playlistId (String, required) - The ID of the playlist to delete
- **Output:** Boolean
- **Brackets:** true
- **Unwrap:** true

## $youtubePlaylistMoveVideo

- **Version:** 1.5.8
- **Description:** Move a video within a YouTube playlist
- **Category:** youtube
- **Arguments:**
  -  playlistId (String, required) - The ID of the playlist containing the video
  -  movedVideoId (String, required) - The ID of the video to move
  -  predecessorVideoId (String, required) - The ID of the video that will be before the moved video (empty for start)
- **Output:** Boolean
- **Brackets:** true
- **Unwrap:** true

## $youtubePlaylistRemoveFromLibrary

- **Version:** 1.5.8
- **Description:** Remove a playlist from the library
- **Category:** youtube
- **Arguments:**
  -  playlistId (String, required) - The ID of the playlist to remove from library
- **Output:** Boolean
- **Brackets:** true
- **Unwrap:** true

## $youtubePlaylistRemoveVideos

- **Version:** 1.5.8
- **Description:** Remove videos from a YouTube playlist
- **Category:** youtube
- **Arguments:**
  -  playlistId (String, required) - The ID of the playlist to remove videos from
  -  useSetVideoIds (Boolean) - Whether to use set video IDs (true) or playlist item IDs (false)
  -  videoIds (String, required, rest) - Comma-separated list of video IDs to remove from the playlist
- **Output:** Boolean
- **Brackets:** true
- **Unwrap:** true

## $youtubePlaylistSetDescription

- **Version:** 1.5.8
- **Description:** Set the description of a YouTube playlist
- **Category:** youtube
- **Arguments:**
  -  playlist_id (String, required) - The ID of the playlist to update
  -  description (String, required) - The new description for the playlist
- **Output:** Boolean
- **Brackets:** true
- **Unwrap:** true

## $youtubePlaylistSetName

- **Version:** 1.5.8
- **Description:** Set the name of a YouTube playlist
- **Category:** youtube
- **Arguments:**
  -  playlistId (String, required) - The ID of the playlist to rename
  -  name (String, required) - The new name for the playlist
- **Output:** Boolean
- **Brackets:** true
- **Unwrap:** true

## $youtubeResolveURL

- **Version:** 1.5.8
- **Description:** Resolves a URL.
- **Category:** youtube
- **Arguments:**
  -  url (String, required) - The URL to resolve.
- **Brackets:** true
- **Unwrap:** true

## $youtubeSearch

- **Version:** 1.5.8
- **Description:** Searches YouTube.
- **Category:** youtube
- **Arguments:**
  -  query (String, required) - The query to search for.
  -  uploadDate (Enum): [All, Hour, Today, Week, Month, Year] - The upload date to filter by.
  -  duration (Enum): [All, Short, Medium, Long] - The duration to filter by.
  -  type (Enum): [Video, Channel, Playlist, Movie, All] - The type to filter by.
  -  sortBy (Enum): [Relevance, Rating, UploadDate, ViewCount] - The sort by to filter by.
  -  features (Enum, rest): [HD, Subtitles, FourK, Live, ThreeSixty, ThreeD, HDR, CreativeCommons, VR180] - The features to filter by.
- **Brackets:** true
- **Unwrap:** true

