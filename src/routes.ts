import { Router } from "express";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const router = Router();

const createUserController = new CreateUserController();
router.post('/users', createUserController.handle);


const createTagController = new CreateTagController();
router.post('/tags', ensureAdmin, createTagController.handle);

const authenticateUserController = new AuthenticateUserController();
router.post('/login', authenticateUserController.handle);

export {router};