import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdatedUserAvatar from '../services/UpdatedUserAvatarServie';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.post('/', async (request, response) => {
  const { email, password, name } = request.body;
  const createUserService = new CreateUserService();

  const user = await createUserService.execute({
    email,
    password,
    name,
  });

  delete user.password;
  return response.json(user);
});

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updatedUserAvatar = new UpdatedUserAvatar();
    const user = await updatedUserAvatar.execute({
      fileName: request.file.filename,
      userId: request.user.id,
    });
    delete user.password;
    return response.json(user);
  },
);

export default userRouter;
