import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

import ensureAuthenticated from './middlewares/ensureAuthenticated';

import SessionsController from './controllers/SessionsController';
import OrphanagesController from './controllers/OrphanagesController';
import OrphanagesPendingController from './controllers/OrphanagesPendingController';
import ForgotPasswordController from './controllers/ForgotPasswordController';
import ResetPasswordController from './controllers/ResetPasswordController';

const sessionsController = new SessionsController();
const orphanagesController = new OrphanagesController();
const orphanagesPendingController = new OrphanagesPendingController();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages/created/:id', orphanagesController.show);
routes.get('/orphanages/created', orphanagesController.index);
routes.post('/orphanages', upload.array('images'), orphanagesController.store);

routes.post('/sessions', sessionsController.store);

routes.post('/forgot-password', forgotPasswordController.store);
routes.get('/reset-password', resetPasswordController.show);

routes.use(ensureAuthenticated);

routes.get('/orphanages/pending/:id', orphanagesPendingController.show);
routes.get('/orphanages/pending', orphanagesPendingController.index);
routes.put('/orphanages/pending/:id', orphanagesPendingController.update);
routes.delete('/orphanages/pending/:id', orphanagesController.destroy);
routes.put('/orphanages/created/:id', orphanagesController.update);
routes.delete('/orphanages/created/:id', orphanagesController.destroy);

export default routes;
