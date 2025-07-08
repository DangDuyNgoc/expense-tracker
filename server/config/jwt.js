import jwt from "jsonwebtoken";

export const createAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m"
    })
}

export const createRefreshToken = (userId) => {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN, {
        expiresIn: "7d"
    })
}

export const sendToken = (res, token) => {
    res.cookie("refreshToken", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
}