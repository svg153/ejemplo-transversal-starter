import cors from 'cors';
import express from 'express';

import healthRouter from './routes/health';
import versionRouter from './routes/version'; // Register the version route alongside the existing health route.

const app = express();

app.use(cors());
app.use(express.json());
app.use(healthRouter);
app.use(versionRouter); // Mount the version route on the shared Express app.

export default app;
