import { Router } from 'express';

import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionsRouter);

routes.get('/', (request, response) => {
  response.json({ message: 'Hello World' });
});

export default routes;
