import { createServer, Server } from 'node:http';
import { AddressInfo } from 'node:net';

import app from '../src/app';

describe('GET /api/health', () => {
  let server: Server;

  afterEach(async () => {
    if (!server) {
      return;
    }

    await new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  });

  it('returns an ok payload', async () => {
    server = createServer(app);

    await new Promise<void>((resolve) => {
      server.listen(0, '127.0.0.1', () => resolve());
    });

    const address = server.address();

    if (!address || typeof address === 'string') {
      throw new Error('Expected the server to expose a numeric port');
    }

    const response = await fetch(`http://127.0.0.1:${(address as AddressInfo).port}/api/health`);

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ status: 'ok' });
  });
});
