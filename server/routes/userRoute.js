import express from 'express';
import {
    getAllUserController,
    getUserInfoController,
    loginController,
    logoutController,
    refreshTokenController,
    registrationController
} from '../controllers/authController.js';
import { isAuthenticated, isAdmin } from '../middlewares/authMiddleware.js';

const userRoute = express.Router();

userRoute.post("/registration", registrationController);
userRoute.post("/login", loginController);
userRoute.post("/logout", logoutController);
userRoute.get("/me", isAuthenticated, getUserInfoController);
userRoute.get("/refresh-token", refreshTokenController);
userRoute.get("/get-users", isAuthenticated, isAdmin, getAllUserController);

export default userRoute;