"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../../utils/errorHandler");
var SearchRepoSort;
(function (SearchRepoSort) {
    SearchRepoSort["Stars"] = "stars";
    SearchRepoSort["Forks"] = "forks";
    SearchRepoSort["HelpWantedIssues"] = "help-wanted-issues";
    SearchRepoSort["Updated"] = "updated";
})(SearchRepoSort || (SearchRepoSort = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["Asc"] = "asc";
    SortOrder["Desc"] = "desc";
})(SortOrder || (SortOrder = {}));
exports.default = new forgescript_1.NativeFunction({
    name: '$githubSearchRepo',
    description: 'Search GitHub for repositories',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'query',
            description: 'The search query',
            type: forgescript_1.ArgType.String,
            required: true,
            rest: false,
        },
        {
            name: 'sort',
            description: 'The sort order',
            type: forgescript_1.ArgType.Enum,
            enum: SearchRepoSort,
            required: true,
            rest: false,
        },
        {
            name: 'order',
            description: 'The order of the results',
            type: forgescript_1.ArgType.Enum,
            enum: SortOrder,
            required: true,
            rest: false,
        },
        {
            name: 'page',
            description: 'The page of the results',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false,
        },
        {
            name: 'per_page',
            description: 'The number of results per page',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false,
        },
    ],
    output: forgescript_1.ArgType.Json,
    async execute(ctx, [query, sort, order, page, per_page]) {
        try {
            const ext = ctx.getExtension('ForgeSocial');
            const github = ext.github;
            if (!github) {
                return this.customError('GitHub client not initialized');
            }
            const response = await github.search.repos({
                q: query,
                sort: sort,
                order: order,
                page,
                per_page,
            });
            return this.success(JSON.stringify(response, undefined, 2));
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleGitHubError)(error));
        }
    },
});
//# sourceMappingURL=githubSearchRepo.js.map