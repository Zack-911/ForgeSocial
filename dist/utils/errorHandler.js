"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGitHubError = handleGitHubError;
const request_error_1 = require("@octokit/request-error");
function handleGitHubError(error) {
    if (error instanceof request_error_1.RequestError) {
        return JSON.stringify({
            error: {
                message: error.message,
                status: error.status,
                response: {
                    data: error.response?.data,
                    status: error.response?.status,
                },
            },
        }, null, 2);
    }
    return JSON.stringify({
        error: {
            message: error instanceof Error ? error.message : 'Unknown error',
            code: 500,
        },
    }, null, 2);
}
//# sourceMappingURL=errorHandler.js.map