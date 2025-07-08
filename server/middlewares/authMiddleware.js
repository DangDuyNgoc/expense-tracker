import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
export const isAuthenticated = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization?.replace("Bearer ", "");
        if (!accessToken) {
            return res.status(403).send({
                success: false,
                message: "Please login to access this resource"
            })
        }

        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (!decoded) {
            return res.status(403).send({
                success: false,
                message: "Invalid access token"
            })
        }
        const user = await userModel.findById(decoded.userId);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).send({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user?._id);
        if (user.role !== 1) {
            return res.status(404).send({
                success: false,
                message: "Unauthorized Access",
            })
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}