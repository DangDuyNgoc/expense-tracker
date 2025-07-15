import { createAccessToken, createRefreshToken, sendToken } from "../config/jwt.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import userModel from "../models/userModel.js";

import jwt from "jsonwebtoken";

export const registrationController = async (req, res) => {
    try {
        const { fullName, email, password, avatar } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please fill all the fields"
            })
        }

        // check if user already exists
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "User already exists"
            })
        }

        // hash the password
        const hash = await hashPassword(password);


        // create new user
        const newUser = await userModel.create({
            fullName,
            email,
            password: hash,
            avatar
        })

        const accessToken = createAccessToken(newUser._id);
        const refreshToken = createRefreshToken(newUser._id);
        sendToken(res, refreshToken);

        return res.status(201).send({
            success: true,
            message: "User registered successfully",
            user: newUser,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send({ success: false, message: "Internal server error" });
    }
}

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please fill all the fields"
            });
        }

        // check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        // check password
        const isSamePassword = await comparePassword(password, user.password);
        if (!isSamePassword) {
            return res.status(400).send({
                success: false,
                message: "Invalid credentials"
            });
        }

        const accessToken = createAccessToken(user._id);
        const refreshToken = createRefreshToken(user._id);
        sendToken(res, refreshToken);

        return res.status(200).send({
            success: true,
            message: "User logged in successfully",
            user,
            accessToken: accessToken,
            refreshToken: refreshToken
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).send(
            {
                success: false,
                message: "Internal server error"
            }
        );
    }
}

export const logoutController = async (req, res) => {
    try {
        res.cookie("refreshToken", "", {
            expires: new Date(Date.now()),
            httpOnly: true,
            sameSite: "strict",
            secure: true
        });
        return res.status(200).send({
            success: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).send({
            success: false,
            message: "Internal server error"
        });
    }
}

export const getUserInfoController = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized access"
            });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).send({
            success: true,
            message: "User info retrieved successfully",
            user
        });
    } catch (error) {
        console.error("Get user info error:", error);
        res.status(500).send({
            success: false,
            message: "Internal server error"
        });
    }
}

export const getAllUserController = async (req, res) => {
    try {
        const user = await userModel.find().sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            message: "Get all users info successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}

export const refreshTokenController = async (req, res) => {
    try {
        const refresh_token = req.cookies.refreshToken;

        if (!refresh_token) {
            return res.status(401).send({
                success: false,
                message: "Refresh token is missing",
            });
        }

        // verify refresh 
        let decoded;
        try {
            decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN);
        } catch (error) {
            res.clearCookie("refreshToken");
            return res.status(403).send({
                success: false,
                message: "Invalid or expired refresh token",
            });
        }

        const user = await userModel.findById(decoded.userId);
        if (!user) {
            res.clearCookie("refreshToken");
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        };

        // create new token
        const newAccessToken = createAccessToken(user._id);
        const newRefreshToken = createRefreshToken(user._id);

        // updated refresh token in cookie
        sendToken(res, newRefreshToken);

        return res.status(200).send({
            success: true,
            message: "Access token refreshed successfully",
            accessToken: newAccessToken,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
}