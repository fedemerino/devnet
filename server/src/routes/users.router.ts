import router from "../utils/router";
import { getUsers, signUp, login } from "../controllers/users.controller";

router.get("/", getUsers);
router.post("/login", login);
router.post("/signup", signUp);

export default router;
