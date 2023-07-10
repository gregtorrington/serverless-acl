import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import fetch, { FetchError } from 'node-fetch';

import { ListData } from 'types';

export const main = async (
  event: APIGatewayProxyEvent | Partial<APIGatewayProxyEvent>,
): Promise<APIGatewayProxyResult> => {
  const authorizationToken = event.headers?.authorizationToken;
  if (authorizationToken === undefined) {
    throw new Error('Authorization token is not valid.');
  }

  let code = event.pathParameters?.code;
  if (code === undefined) {
    code = 'default-code';
  }

  const thirdPartyBaseUrl = 'https://third.party.api';
  const url = `${thirdPartyBaseUrl}/list?code=${code}`;

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
  const listData = (await response.json()) as ListData;

  let totalValues = 0;
  const listLength = listData.items.length;
  for (let i = 0; i < listLength; i++) {
    totalValues += listData.items[i]?.value ?? 0;
  }

  const listResponse = {
    totalValues: totalValues,
    listLength: listLength,
    ...listData.items,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(listResponse),
  };
};
