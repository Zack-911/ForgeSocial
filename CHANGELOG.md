# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.5.4](https://github.com/zack-911/forgesocial/compare/v1.5.3...v1.5.4) (2025-08-26)

### [1.5.3](https://github.com/zack-911/forgesocial/compare/v1.5.2...v1.5.3) (2025-08-26)

### [1.5.2](https://github.com/zack-911/forgesocial/compare/v1.5.0...v1.5.2) (2025-08-26)


### Refactoring

* make the function return true ([0566196](https://github.com/zack-911/forgesocial/commit/05661965211a91b3463a14145896ce8559499f9b))
* now returns more info for almost every command ([15ed246](https://github.com/zack-911/forgesocial/commit/15ed2466a05d50b3343b385da53b0002df34a79e))


### Chores

* **ci:** update dist and metadata [skip ci] ([1e1620a](https://github.com/zack-911/forgesocial/commit/1e1620a126f65a990d835f404a2d704bfd22fb69))
* **release:** 1.5.1 ([334bdc9](https://github.com/zack-911/forgesocial/commit/334bdc9331c48ccbb1f7496aa1ff86276e5d4ea2))

### [1.5.1](https://github.com/zack-911/forgesocial/compare/v1.5.0...v1.5.1) (2025-08-25)

### Refactoring

- make the function return true ([0566196](https://github.com/zack-911/forgesocial/commit/05661965211a91b3463a14145896ce8559499f9b))
- now returns more info for almost every command ([9e7e84e](https://github.com/zack-911/forgesocial/commit/9e7e84ed1e5e372242cff19e0217203243055a11))

## [1.5.0](https://github.com/zack-911/forgesocial/compare/v1.2.0...v1.5.0) (2025-08-25)

### Features

- add $extractVideoID command to extract YouTube video IDs from URLs or strings ([a35b73c](https://github.com/zack-911/forgesocial/commit/a35b73cf8ecb75cfe7242a53ba48e93e97a028d9))
- add $getChannelInfo command to retrieve information about a YouTube channel by ID or handle ([b7a4932](https://github.com/zack-911/forgesocial/commit/b7a4932f64177226e63643b01f57b58f2aeb3657))
- add $getYoutubeVideo command to retrieve detailed information about a YouTube video, including comments and statistics ([e59c4b7](https://github.com/zack-911/forgesocial/commit/e59c4b71e7d2a96121949a3d61ee8a672f9b88b1))
- add $searchYoutube command for enhanced YouTube video search functionality ([636093c](https://github.com/zack-911/forgesocial/commit/636093c13978f76c91f4f7b4b7c9842c8b9a23ae))
- add $searchYoutubeChannel command to enable searching for YouTube channels and returning results in JSON format ([fd7ef87](https://github.com/zack-911/forgesocial/commit/fd7ef874805ffed4824e4a11cf4bb279135117fa))
- add $searchYoutubeMusic command to enable searching for YouTube Music and returning results in JSON format ([1acd512](https://github.com/zack-911/forgesocial/commit/1acd512845dbf65c7964622613f979d7c4bdf588))
- add $searchYoutubePlaylist command to enable searching for YouTube playlists with various filters ([c57a61e](https://github.com/zack-911/forgesocial/commit/c57a61e411440e8aee4e5fd1d3ec2cd3a3faac1e))
- add commands for tracking and managing YouTube channels, including $trackYoutubeChannel and $unTrackYoutubeChannel ([e8626b6](https://github.com/zack-911/forgesocial/commit/e8626b6dbc1a9afcfda9f83a5567af80bac446c8))
- add githubAddRunnerLabelsRepo ([5b8a9d7](https://github.com/zack-911/forgesocial/commit/5b8a9d73aa3370c5d017cf4f13c8e21d1870f966))
- add githubApproveWorkflow ([a755754](https://github.com/zack-911/forgesocial/commit/a7557541a40ac70b45f55fa73ae888f6df4900cf))
- add githubCancelWorkflowRun ([5c87109](https://github.com/zack-911/forgesocial/commit/5c87109f76e60a3e348d1f76d888d859d20119d1))
- add githubDeleteArtifact ([5941cc3](https://github.com/zack-911/forgesocial/commit/5941cc369909eedaca58eb6b739986c2bd5ea2ef))
- add githubDeleteWorkflowLogs ([9f001f3](https://github.com/zack-911/forgesocial/commit/9f001f3347766bfb1e91d158d4cdc2e32d6e94bf))
- add githubDispatchWorkflow ([9dba5a1](https://github.com/zack-911/forgesocial/commit/9dba5a1a685764f07a8a819e527594f8a2a72630))
- add githubDownloadArtifact ([7809002](https://github.com/zack-911/forgesocial/commit/7809002a825265f9ceb9d834c7f70e2c091feaba))
- add githubDownloadJobLogs ([b9896f4](https://github.com/zack-911/forgesocial/commit/b9896f4bd929c208a0dda875d2bb91d20eb46ace))
- add githubDownloadWorkflowRunLogs ([7bf2c42](https://github.com/zack-911/forgesocial/commit/7bf2c425fa7aa297dc0b1745b9631ce6bba69b9d))
- add githubGetArtifact ([eff78d3](https://github.com/zack-911/forgesocial/commit/eff78d340df36a68b1c742abd19ce207908523c4))
- add githubGetWorkflowJob ([e51e3a0](https://github.com/zack-911/forgesocial/commit/e51e3a0a4a7d6bdce38877353a753dc6854e0dbc))
- add githubGetWorkflowRun ([dca9a3f](https://github.com/zack-911/forgesocial/commit/dca9a3f1df63e3f3bde4f3470276dbd0ec2277a6))
- add githubListArtifacts ([f0407d2](https://github.com/zack-911/forgesocial/commit/f0407d2fa81fc372b1ffa5664c17654820fd3fe6))
- add githubListRunArtifacts ([dee6b3b](https://github.com/zack-911/forgesocial/commit/dee6b3b7a561d8c116084fd12ff72d0f8bad8d06))
- add githubListSelfHostedRunnersRepo ([e8af6e3](https://github.com/zack-911/forgesocial/commit/e8af6e3d834ccd7f39ea5ff060c3dfaf9b21e679))
- add githubListWorkflowJobs ([7818f0e](https://github.com/zack-911/forgesocial/commit/7818f0ed230adff0dc7f373d155d5c8894e39cab))
- add githubListWorkflowRuns ([261d81d](https://github.com/zack-911/forgesocial/commit/261d81d9d70d54cc9b4b49ffc64b9e4f0ecbdc3f))
- add githubRemoveRunnerLabelRepo ([b675b63](https://github.com/zack-911/forgesocial/commit/b675b6372321898f15201904dafff24920aac8cd))
- add githubRerunFailedJobs ([f914e09](https://github.com/zack-911/forgesocial/commit/f914e098d6892df736b2f5f4a087215fa4570a19))
- add githubRerunWorkflow ([087c122](https://github.com/zack-911/forgesocial/commit/087c1220ff232660f2950e10227b43b8930c0599))
- add new event handlers for YouTube subscriber and video uploads ([f09739f](https://github.com/zack-911/forgesocial/commit/f09739ff3a959d859e43f2b07b1ddc8bdc7b5034))
- add polling ([1e54bd9](https://github.com/zack-911/forgesocial/commit/1e54bd9b875a8135adc9023d893d609c077aa455))
- integrate YouTube channel polling and enhance ForgeSocial options for improved event handling ([fc24227](https://github.com/zack-911/forgesocial/commit/fc24227e600bdccd53659e8305a92c169104c175))
- integrate youtubei.js for enhanced video functionality ([d748331](https://github.com/zack-911/forgesocial/commit/d7483312e43f507fb54fb3d51e164789a549ddbc))
- made it so unused social media platforms functions are not loaded ([a5091c6](https://github.com/zack-911/forgesocial/commit/a5091c685fc1e0200c514a85099637044f69cbd9))
- update ForgeSocial to handle new YouTube video events and add corresponding command ([8c724d1](https://github.com/zack-911/forgesocial/commit/8c724d19e5212ac5e66d108a1862e82b94ccf66f))

### Bug Fixes

- added some bugs ([831e808](https://github.com/zack-911/forgesocial/commit/831e808cfcf0fd1a73156db7021dfdc5db351211))
- i lied in the command description ([46069c8](https://github.com/zack-911/forgesocial/commit/46069c8882d914eb3380a648e0abf2458c4e8317))
- update $searchYoutube command to improve error handling and response structure ([881c5fe](https://github.com/zack-911/forgesocial/commit/881c5fef4c03b4d44bca246969b5db04e1dde098))

### Chores

- add error handler for github functions ([5bacf53](https://github.com/zack-911/forgesocial/commit/5bacf53db963558fa7fdef1b062d2b09c72c1d77))
- add GitHub Actions workflows for formatting, linting, and security checks ([569aaef](https://github.com/zack-911/forgesocial/commit/569aaeff1296b51d961ce1cb8029e9ac60625aea))
- add githubAddCollaborator ([b71fc4e](https://github.com/zack-911/forgesocial/commit/b71fc4eecf5a590428bf427e34d35a9dffeface7))
- add githubCreateRelease ([6d9de4b](https://github.com/zack-911/forgesocial/commit/6d9de4b262b73df335eee61fee5c887654336fd4))
- add githubCreateRepoOrg ([e41c926](https://github.com/zack-911/forgesocial/commit/e41c926607476bba4bae1519cf3283acebd893d1))
- add githubCreateRepoUser ([c7f3d95](https://github.com/zack-911/forgesocial/commit/c7f3d950bc87dcbd3bffff5c231ed7816c293e48))
- add githubDeleteFile ([76f8481](https://github.com/zack-911/forgesocial/commit/76f8481dda96cbfb8de82348b1bc590a7831c234))
- add githubDeleteRelease ([3a81679](https://github.com/zack-911/forgesocial/commit/3a8167989589d56fde3ffbd6df4cd07116c7e5bc))
- add githubDeleteRepo ([60c7c53](https://github.com/zack-911/forgesocial/commit/60c7c533d87da27952c1648e115be6f8dcc74270))
- add githubGetBranch ([051f543](https://github.com/zack-911/forgesocial/commit/051f543cd7c1bf12822cb282038220177adeb871))
- add githubGetFileContent ([5afc6b5](https://github.com/zack-911/forgesocial/commit/5afc6b5a87d86815449ebbc819cb3def4ee5cf8d))
- add githubGetRelease ([d7d2805](https://github.com/zack-911/forgesocial/commit/d7d280559b6f14dc37eb93990562d64d1651eb22))
- add githubGetRepo ([265bbbd](https://github.com/zack-911/forgesocial/commit/265bbbddd487dea249e020efb97088003e1499fd))
- add githubListBranches ([17e5b4e](https://github.com/zack-911/forgesocial/commit/17e5b4e001a1ea94671df0c2bcf330b13ce7d769))
- add githubListCollaborators ([d76a74a](https://github.com/zack-911/forgesocial/commit/d76a74acb76295daf0189c3eafa1ca419ca017b4))
- add githubListOrgRepos ([14479ef](https://github.com/zack-911/forgesocial/commit/14479ef702f9f9e457145d1839038ef04b7b75cf))
- add githubListReleases ([85fed1e](https://github.com/zack-911/forgesocial/commit/85fed1eee3632a0725eac487e07f3ed8e7342edd))
- add githubListUserRepos ([5edeb12](https://github.com/zack-911/forgesocial/commit/5edeb12b2b24a257527eaf9288c075ec5b3acc84))
- add githubRemoveCollaborator ([755c17f](https://github.com/zack-911/forgesocial/commit/755c17f860416f94f474b372aad57d0787c9396e))
- add githubUnprotectBranch ([b14a5dd](https://github.com/zack-911/forgesocial/commit/b14a5dd9fee467a0c13aa1970fe501a0dfb7952b))
- add githubUpdateFile ([fed7db8](https://github.com/zack-911/forgesocial/commit/fed7db89ae0f93f9a5eae46bf86514be5d4e1fc2))
- add githubUpdateRelease ([afecad9](https://github.com/zack-911/forgesocial/commit/afecad9bed700215693e0ec4986d80435212d845))
- add githubUpdateRepo ([623e21d](https://github.com/zack-911/forgesocial/commit/623e21d7d2ab7f7a3111551734a3bdfb240c3b1a))
- add githubUploadReleaseAsset ([991472b](https://github.com/zack-911/forgesocial/commit/991472ba6ea591b1ff11f1bdda54f5b053c73a79))
- add music tracks to video info ([e48e280](https://github.com/zack-911/forgesocial/commit/e48e280925f6065cd9f1df73136fe8fe7bb2b801))
- add Prettier and ESLint configuration files for code formatting and linting ([717a756](https://github.com/zack-911/forgesocial/commit/717a7568e5b9b0b67829f7755bf28e3d898d14a0))
- added octokit package ([0356db3](https://github.com/zack-911/forgesocial/commit/0356db3f07147f42be92a02973ee952975b8d0c8))
- balls ([6cc28d0](https://github.com/zack-911/forgesocial/commit/6cc28d06ff65b5d659b7d56f7c8adb20190e8ca0))
- **ci:** update dist and metadata [skip ci] ([86f4d4e](https://github.com/zack-911/forgesocial/commit/86f4d4e2bc03f615130b03d70f58e96d5a65d56e))
- Create youtube related enums ([c7b3d23](https://github.com/zack-911/forgesocial/commit/c7b3d230d64408a2929d0212b5da083f308b2252))
- fix extras name in newRedditPost event ([ab062d8](https://github.com/zack-911/forgesocial/commit/ab062d81e71921bdc6d46690c970c7fe4861ea59))
- **release:** 1.3.0 ([8f89bbe](https://github.com/zack-911/forgesocial/commit/8f89bbe7805596c50be11f35d31b7642ed4349e6))
- **release:** 1.4.0 ([74c61c8](https://github.com/zack-911/forgesocial/commit/74c61c84c6c49aed52f7a02f0a8fac0ff485d304))
- update .gitignore and CI workflow to include metadata and support dev branch ([ff2b722](https://github.com/zack-911/forgesocial/commit/ff2b722bd325a248b469f1d481aad9d26407875b))
- update CI workflow to add write permissions for contents ([1cb559a](https://github.com/zack-911/forgesocial/commit/1cb559abf72fca0fd354304458d8a1a5bbf39800))
- update file to correctly work with updated structure ([7fe466f](https://github.com/zack-911/forgesocial/commit/7fe466fa4dd57a377520eb8b5a88a23d6ff0a555))

## [1.4.0](///compare/v1.3.0...v1.4.0) (2025-07-24)

### Features

- add $extractVideoID command to extract YouTube video IDs from URLs or strings f977d37
- add $getChannelInfo command to retrieve information about a YouTube channel by ID or handle cc1bcd9
- add $getYoutubeVideo command to retrieve detailed information about a YouTube video, including comments and statistics ac7c17e
- add $searchYoutubeChannel command to enable searching for YouTube channels and returning results in JSON format be291a2
- add $searchYoutubeMusic command to enable searching for YouTube Music and returning results in JSON format 64f5a1b
- add $searchYoutubePlaylist command to enable searching for YouTube playlists with various filters 699c1e0
- add commands for tracking and managing YouTube channels, including $trackYoutubeChannel and $unTrackYoutubeChannel ec894a5
- add new event handlers for YouTube subscriber and video uploads b955774
- add polling 454ddfb
- integrate YouTube channel polling and enhance ForgeSocial options for improved event handling 6aaa683
- update ForgeSocial to handle new YouTube video events and add corresponding command 8bc5641

### Bug Fixes

- added some bugs 02dadf9
- i lied in the command description ca9592a
- update $searchYoutube command to improve error handling and response structure a349504

### Chores

- add music tracks to video info fcd7e66
- balls a37b1b4
- fix extras name in newRedditPost event 1e921ba
- update .gitignore and CI workflow to include metadata and support dev branch 2208fb7
- update CI workflow to add write permissions for contents 0aa8c74

## [1.3.0](///compare/v1.2.0...v1.3.0) (2025-07-20)

### Features

- add $searchYoutube command for enhanced YouTube video search functionality c1a8930
- integrate youtubei.js for enhanced video functionality 2bdc733

### Chores

- add GitHub Actions workflows for formatting, linting, and security checks 569aaef
- add Prettier and ESLint configuration files for code formatting and linting 717a756
- Create youtube related enums d58c846

## [1.2.0](///compare/v1.1.0...v1.2.0) (2025-07-19)

### Features

- Add new event for new Reddit posts cccfc8e
- added jsDocs, polling support and a bunch more 1527349
- Implement functions for tracking and managing Reddit subreddits fb6f484
- new event support 8125080

### Bug Fixes

- replace pnpm with npm so github actions work 5e22d9c

### Tests

- Add new command for handling new Reddit posts and update client configuration 4391cc6

### Chores

- Enhance redditFetch utility with comprehensive error handling, rate limit management, and detailed documentation 072f9bb
- mostly organisations 5c3f05f

## [1.1.0](///compare/v1.0.3...v1.1.0) (2025-07-18)

### Features

- Refactor Reddit API calls to utilize access token for authentication and update related functions f5cdbbe
- Update Reddit API calls to include access token for authentication 58acd23

### [1.0.3](///compare/v1.0.2...v1.0.3) (2025-07-18)

### Features

- add ratelimit handling be4efa2
- Create function getWiki 8526ae6
- Create function getWikiPages 9898be6
- Create function getWikiRevisions 1df0f8b

### Chores

- add build and docgen job f8d5e64

### [1.0.2](///compare/v1.0.1...v1.0.2) (2025-07-18)

### Chores

- add dist folder a1339f9

### 1.0.1 (2025-07-18)

### Features

- create error.ts in events febfcd5
- create fetch utils 5beb3cf
- create structures files and folders ee55a2d
- create subreddit related functions 4400754
- create user related functions c5371dd
- init 1b9f190

### Chores

- Create readme and license.md 4cd19ee

### Tests

- create tests files 6c74552

### Documentation

- create outputs in tests files 48f3553
