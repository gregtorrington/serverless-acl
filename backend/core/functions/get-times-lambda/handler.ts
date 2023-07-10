import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import fetch, { FetchError } from 'node-fetch';

import { TimesData } from 'types';

export const main = async (
  event: APIGatewayProxyEvent | Partial<APIGatewayProxyEvent>,
): Promise<APIGatewayProxyResult> => {
  const authorizationToken = event.headers?.authorizationToken;
  if (authorizationToken === undefined) {
    throw new Error('Authorization token is not valid.');
  }

  const thirdPartyBaseUrl = 'https://third.party.api';
  const url = `${thirdPartyBaseUrl}/times`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      ...event.headers,
      Authorization: authorizationToken,
      'Content-Type': 'application/json',
    },
  });

  if (response.status >= 400 || response.status < 200) {
    const err = new FetchError(response.statusText, `${response.status}`);
    err.code = `${response.status}`;
    throw err;
  }

  const timesData = (await response.json()) as TimesData;

  return {
    statusCode: 200,
    body: JSON.stringify(timesData),
  };
};
