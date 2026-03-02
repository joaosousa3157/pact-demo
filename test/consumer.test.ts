import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import { fetchUser } from '../src/consumer';
import path from 'path';

const { integer, string, regex } = MatchersV3;

const provider = new PactV3({
  dir: path.resolve(process.cwd(), 'pacts'),
  consumer: 'frontend',
  provider: 'api',
});

//Define o contrato no Pact
function defineContract()
{
  return provider
    .given('a user exists')
    .uponReceiving('a request for a user')
    .withRequest({ 
      method: 'GET', 
      path: regex('/users/[0-9]+', '/users/123'),
    })
    .willRespondWith({
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: {
        id: integer(),
        name: string(),
        email: string(),
      },
    });
}

describe('Consumer test', () => {
  it('should fetch a user with correct types', async () => {
    defineContract();

    await provider.executeTest(async ({ url }) => {
      const user = await fetchUser(url, 1);
      expect(typeof user.id).toBe('number');
      expect(typeof user.name).toBe('string');
      expect(typeof user.email).toBe('string');
    });
  });
});