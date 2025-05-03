import { Router } from "express";
import { handleCreateUser,handleDeleteUserById,handleGetAllUsers,handleGetUserById,handleUpdateUserById} from "../controllers/users.controllers.js"

const router = Router();


// / route
router.route("/").get(handleGetAllUsers).post(handleCreateUser);



router.route("/:userid")
        .get(handleGetUserById)
        .patch(handleUpdateUserById)
        .delete(handleDeleteUserById)


export default router;




