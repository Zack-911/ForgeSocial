import { NativeFunction, ArgType } from '@tryforge/forgescript';
import { ForgeSocial } from '../../../';
import { handleYoutubeError } from '../../../utils/errorHandler';
import { EngagementType } from '../../../utils/youtubeEnums';

export default new NativeFunction({
  name: '$youtubeGetAttestationChallenge',
  description: 'Gets an attestation challenge for YouTube.',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'engagement_type',
      description: 'The engagement type to get an attestation challenge for.',
      type: ArgType.Enum,
      enum: EngagementType,
      required: true,
      rest: false,
    },
    {
      name: 'ids',
      description: 'The IDs to get an attestation challenge for.',
      type: ArgType.String,
      required: false,
      rest: true,
    },
  ],
  async execute(ctx, [engagement_type, ids]) {
    const ext = ctx.getExtension('ForgeSocial') as ForgeSocial;
    const youtube = ext.youtube;
    if (!youtube) return this.customError('YouTube not configured or not found');
    try {
      const challenge = await youtube.getAttestationChallenge(
        engagement_type,
        ids?.map((id) => ({ id })) ?? [],
      );
      return this.success(JSON.stringify(challenge, null, 2));
    } catch (err) {
      return this.success(handleYoutubeError(err));
    }
  },
});
