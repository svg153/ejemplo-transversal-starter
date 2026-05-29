import { Router } from 'express';

import { config } from '../config';

const healthRouter = Router();

healthRouter.get(`${config.apiBasePath}/health`, (_request, response) => {
  response.status(200).json({ status: 'ok' });
});

export default healthRouter;
