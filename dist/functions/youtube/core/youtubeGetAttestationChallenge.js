"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const errorHandler_1 = require("../../../utils/errorHandler");
const youtubeEnums_1 = require("../../../utils/youtubeEnums");
exports.default = new forgescript_1.NativeFunction({
    name: '$youtubeGetAttestationChallenge',
    description: 'Gets an attestation challenge for YouTube.',
    brackets: true,
    unwrap: true,
    args: [
        {
            name: 'engagement_type',
            description: 'The engagement type to get an attestation challenge for.',
            type: forgescript_1.ArgType.Enum,
            enum: youtubeEnums_1.EngagementType,
            required: true,
            rest: false,
        },
        {
            name: 'ids',
            description: 'The IDs to get an attestation challenge for.',
            type: forgescript_1.ArgType.String,
            required: false,
            rest: true,
        },
    ],
    async execute(ctx, [engagement_type, ids]) {
        const ext = ctx.getExtension('ForgeSocial');
        const youtube = ext.youtube;
        if (!youtube)
            return this.customError('YouTube not configured or not found');
        try {
            const challenge = await youtube.getAttestationChallenge(engagement_type, ids?.map((id) => ({ id })) ?? []);
            return this.success(JSON.stringify(challenge, null, 2));
        }
        catch (err) {
            return this.success((0, errorHandler_1.handleYoutubeError)(err));
        }
    },
});
//# sourceMappingURL=youtubeGetAttestationChallenge.js.map