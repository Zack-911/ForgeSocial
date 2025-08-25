"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../../utils/errorHandler");
var Affiliation;
(function (Affiliation) {
    Affiliation["Outside"] = "outside";
    Affiliation["Direct"] = "direct";
    Affiliation["All"] = "all";
})(Affiliation || (Affiliation = {}));
exports.default = new forgescript_1.NativeFunction({
    name: '$githubListCollaborators',
    description: 'Lists repository collaborators',
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
            name: 'affiliation',
            description: 'Filter collaborators by affiliation',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: Affiliation,
        },
        {
            name: 'perPage',
            description: 'Results per page (max 100)',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Number,
        },
        {
            name: 'page',
            description: 'Page number',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Number,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [owner, repo, affiliation, perPage, page]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const github = ext.github;
        if (!github) {
            return this.customError('GitHub client not initialized');
        }
        try {
            const collaborators = await github.rest.repos.listCollaborators({
                owner,
                repo,
                affiliation: affiliation || Affiliation.All,
                per_page: perPage || undefined,
                page: page || undefined,
            });
            return this.success(JSON.stringify(collaborators.data, undefined, 2));
        }
        catch (e) {
            return this.success((0, errorHandler_1.handleGitHubError)(e));
        }
    },
});
//# sourceMappingURL=githubListCollaborators.js.map