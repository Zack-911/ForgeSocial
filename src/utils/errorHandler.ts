/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestError } from '@octokit/request-error';

export function handleGitHubError(error: unknown): string {
  if (error instanceof RequestError) {
    return JSON.stringify(
      {
        error: {
          message: error.message,
          status: error.status,
          response: {
            data: error.response?.data,
            status: error.response?.status,
          },
        },
      },
      null,
      2,
    );
  }

  return JSON.stringify(
    {
      error: {
        message: error instanceof Error ? error.message : 'Unknown error',
        code: 500,
      },
    },
    null,
    2,
  );
}

export function handleYoutubeError(error: any): string {
  return JSON.stringify(error, null, 2);
}
