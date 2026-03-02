import { Verifier } from '@pact-foundation/pact';
import { Server } from 'http';
import app  from '../src/provider';
import path from 'path';


async function verifyContract() {
  const verifier = new Verifier({
    provider: 'api',
    providerBaseUrl: 'http://localhost:8080',
    pactUrls: [path.resolve(process.cwd(), 'pacts/frontend-api.json')],
  });

  await verifier.verifyProvider();
}

describe('Provider Verification', () => {
  let server: Server;

  beforeAll((done) => {
    server = app.listen(8080, done);
  });

  afterAll(() => server.close());

  it('verifies the contract', async () => {
    await verifyContract();
  });
});