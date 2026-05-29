import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const DEFAULT_PORT = 3000;
const rawPort = process.env.PORT;
const resolvedPort = rawPort ? Number(rawPort) : DEFAULT_PORT;

if (!Number.isInteger(resolvedPort) || resolvedPort <= 0) {
  throw new Error('PORT must be a positive integer');
}

export const config = {
  host: '0.0.0.0',
  port: resolvedPort,
  apiBasePath: '/api'
};
