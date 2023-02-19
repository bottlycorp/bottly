import gqlRequest, { Variables } from 'graphql-request';
import { api } from '../../resources/secret.json';

export async function request<T>(request: string, variables?: Variables): Promise<T> {
	return await gqlRequest(api.url, request, variables, {
		'authorization': 'Bot ' + api.token
	});
}