import express from 'express';
import { Router } from 'express';
import * as userController from '../controllers/userController';
import * as authController from '../controllers/authController';

const router: Router = express.Router();

router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);

router.route('/').get(userController.getAllUsers);

router.route('/:token').get(userController.getUser);

export default router;
