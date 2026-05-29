import cors from 'cors';
import express from 'express';

import healthRouter from './routes/health';

const app = express();

app.use(cors());
app.use(express.json());
app.use(healthRouter);

export default app;
