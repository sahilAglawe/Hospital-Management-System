export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();
    const cookieName = user.role === "admin" ? "adminToken" : "userToken";
    res.status(statusCode).cookie(cookieName, token, {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE *24 * 60 * 60 * 1000
        ), // 2 days
        httpOnly: true,
    }).json({
        success: true,
        message,
        user,
        token,
    });

};