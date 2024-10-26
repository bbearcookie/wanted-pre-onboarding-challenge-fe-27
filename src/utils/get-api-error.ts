import { HTTPError } from 'ky';

export const getApiErrorMessage = async (error: Error) => {
  if (error instanceof HTTPError) {
    return (await error.response.json<{ details: string }>()).details;
  }

  return error.message;
};
