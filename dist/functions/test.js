"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.NativeFunction({
    name: '$test',
    version: '1.0.0',
    description: 'a test command ignore this uwu',
    unwrap: false,
    output: forgescript_1.ArgType.Json,
    async execute(ctx) {
        const ext = ctx.getExtension('ForgeSocial');
        console.log('hello');
        try {
            ext.fireEvent('newRedditPost', {
                subreddit: 'test',
                post: {
                    title: 'test',
                    url: 'https://example.com',
                }
            });
            console.log('Fired');
            return this.success('Test passed');
        }
        catch (error) {
            return this.success(error);
        }
    },
});
//# sourceMappingURL=test.js.map