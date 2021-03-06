import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
router.post('/users', createUserController.handle);

const listUsersController = new ListUsersController();
router.get('/users', ensureAuthenticated,listUsersController.handle);

const createTagController = new CreateTagController();
router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle);

const listTagsController = new ListTagsController();
router.get('/tags', ensureAuthenticated, listTagsController.handle);

const authenticateUserController = new AuthenticateUserController();
router.post('/login', authenticateUserController.handle);

const createComplimentController = new CreateComplimentController();
router.post('/compliments', ensureAuthenticated, createComplimentController.handle);

const listUserSendComplimentsController = new ListUserSendComplimentsController();
router.get('/users/compliments/send', ensureAuthenticated, listUserSendComplimentsController.handle);

const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController();
router.get('/users/compliments/receive', ensureAuthenticated, listUserReceiveComplimentsController.handle);
export {router};