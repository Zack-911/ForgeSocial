"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../../utils/errorHandler");
var SearchLabelSort;
(function (SearchLabelSort) {
    SearchLabelSort["Updated"] = "updated";
    SearchLabelSort["Created"] = "created";
})(SearchLabelSort || (SearchLabelSort = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["Asc"] = "asc";
    SortOrder["Desc"] = "desc";
})(SortOrder || (SortOrder = {}));
exports.default = new forgescript_1.NativeFunction({
    name: '$githubSearchLabels',
    description: 'Search GitHub for labels',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'repository_id',
            description: 'The ID of the repository to search in',
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false,
        },
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
            enum: SearchLabelSort,
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
    async execute(ctx, [repository_id, query, sort, order, page, per_page]) {
        try {
            const ext = ctx.getExtension('ForgeSocial');
            const github = ext.github;
            if (!github) {
                return this.customError('GitHub client not initialized');
            }
            const response = await github.search.labels({
                q: query,
                sort: sort,
                order: order,
                page,
                per_page,
                repository_id: repository_id,
            });
            return this.success(JSON.stringify(response, undefined, 2));
        }
        catch (error) {
            return this.success((0, errorHandler_1.handleGitHubError)(error));
        }
    },
});
//# sourceMappingURL=githubSearchLabels.js.map