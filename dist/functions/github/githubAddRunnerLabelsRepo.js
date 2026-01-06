"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../utils/errorHandler");
exports.default = new forgescript_1.NativeFunction({
    name: '$githubAddRunnerLabelsRepo',
    description: 'Adds custom labels to a self-hosted runner for a repository',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'owner',
            description: 'The owner of the repository',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'repo',
            description: 'The name of the repository',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'runnerId',
            description: 'The ID of the self-hosted runner',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.Number,
        },
        {
            name: 'labels',
            description: 'Array of label names to add (comma-separated)',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [owner, repo, runnerId, labels]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const github = ext.github;
        if (!github) {
            return this.customError('GitHub client not initialized');
        }
        const labelsArray = labels.split(',').map((l) => l.trim());
        try {
            const result = await github.actions.addCustomLabelsToSelfHostedRunnerForRepo({
                owner,
                repo,
                runner_id: runnerId,
                labels: labelsArray,
            });
            return this.success(JSON.stringify(result, undefined, 2));
        }
        catch (e) {
            return this.success((0, errorHandler_1.handleGitHubError)(e));
        }
    },
});
//# sourceMappingURL=githubAddRunnerLabelsRepo.js.map