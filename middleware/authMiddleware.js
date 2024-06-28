const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ error: "Not authenticated" });
        }

        const decoded = jwt.verify(token, "your_jwt_secret");
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return res.status(401).json({ error: "Invalid token" });
        }

        next();
    } catch (error) {
        res.status(401).json({ error: "Not authenticated" });
    }
};

module.exports = authMiddleware;
