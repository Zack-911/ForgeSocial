import { ArgType, NativeFunction } from '@tryforge/forgescript';

export default new NativeFunction({
  name: '$extractVideoID',
  version: '1.0.0',
  description: 'Extracts a YouTube video ID from a URL or string.',
  brackets: true,
  unwrap: true,
  args: [
    {
      name: 'input',
      description: 'YouTube URL or video ID',
      required: true,
      rest: false,
      type: ArgType.String,
    },
  ],
  output: ArgType.String,
  async execute(ctx, [input]) {
    const raw = String(input || '').trim();
    if (!raw) return this.success('');

    const match = raw.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:&|$)/);
    const id = match?.[1] || (raw.length === 11 ? raw : null);

    return this.success(id || '');
  },
});
