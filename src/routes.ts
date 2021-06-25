import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
router.post('/users', createUserController.handle);


const createTagController = new CreateTagController();
router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle);

const authenticateUserController = new AuthenticateUserController();
router.post('/login', authenticateUserController.handle);

const createComplimentController = new CreateComplimentController();
router.post('/compliments', ensureAuthenticated, createComplimentController.handle);

const listUserSendComplimentsController = new ListUserSendComplimentsController();
router.get('/users/compliments/send', ensureAuthenticated, listUserSendComplimentsController.handle);
export {router};