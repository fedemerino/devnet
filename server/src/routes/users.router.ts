import { Router } from "express";
import { getUsers, signUp} from '../controllers/users.controller';

const router = Router();
router.get("/", getUsers);
router.post("/signup", signUp);

export default router;
