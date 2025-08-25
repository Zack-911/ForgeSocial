"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../../utils/errorHandler");
var RepoType;
(function (RepoType) {
    RepoType["All"] = "all";
    RepoType["Public"] = "public";
    RepoType["Private"] = "private";
    RepoType["Forks"] = "forks";
    RepoType["Sources"] = "sources";
    RepoType["Member"] = "member";
})(RepoType || (RepoType = {}));
var SortType;
(function (SortType) {
    SortType["Created"] = "created";
    SortType["Updated"] = "updated";
    SortType["Pushed"] = "pushed";
    SortType["FullName"] = "full_name";
})(SortType || (SortType = {}));
var DirectionType;
(function (DirectionType) {
    DirectionType["Asc"] = "asc";
    DirectionType["Desc"] = "desc";
})(DirectionType || (DirectionType = {}));
exports.default = new forgescript_1.NativeFunction({
    name: '$githubListOrgRepos',
    description: 'Lists organization repositories',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'org',
            description: 'The organization name',
            required: true,
            rest: false,
            type: forgescript_1.ArgType.String,
        },
        {
            name: 'type',
            description: 'Type of repositories to list',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: RepoType,
        },
        {
            name: 'sort',
            description: 'Sorting criterion',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: SortType,
        },
        {
            name: 'direction',
            description: 'Sorting direction',
            required: false,
            rest: false,
            type: forgescript_1.ArgType.Enum,
            enum: DirectionType,
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
    async execute(ctx, [org, type, sort, direction, perPage, page]) {
        const ext = ctx.client.getExtension('ForgeSocial');
        const github = ext.github;
        if (!github) {
            return this.customError('GitHub client not initialized');
        }
        try {
            const repos = await github.rest.repos.listForOrg({
                org,
                type: type ? type : undefined,
                sort: sort ? sort : undefined,
                direction: direction ? direction : undefined,
                per_page: perPage ?? undefined,
                page: page ?? undefined,
            });
            return this.success(JSON.stringify(repos.data, undefined, 2));
        }
        catch (e) {
            return this.success((0, errorHandler_1.handleGitHubError)(e));
        }
    },
});
//# sourceMappingURL=githubListOrgRepos.js.map