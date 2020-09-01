import { Router } from 'express';

import appointmentsRouter from './appointments.routes';
import userRouter from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);

routes.get('/', (request, response) => {
  response.json({ message: 'Hello World' });
});

export default routes;
