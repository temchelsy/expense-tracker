// middleware/authMiddleware.js

import jwt from "jsonwebtoken";
import { pool } from "../libs/database.js";

/**
 * Authentication Middleware
 * Verifies JWT tokens and attaches user information to the request object.
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized: No token provided." });
    }

    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user details from the database
    const userResult = await pool.query({
      text: `
        SELECT id, email, firstName, lastName, role 
        FROM tbluser 
        WHERE id = $1
      `,
      values: [decoded.userId],
    });

    const user = userResult.rows[0];

    if (!user) {
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized: User not found." });
    }

    // Attach user information to the request object
    req.user = {
      userId: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role, // e.g., 'admin' or 'user'
    };

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authentication error:", error);

    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized: Token expired." });
    }

    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ status: "failed", message: "Unauthorized: Invalid token." });
    }

    // Handle other errors
    res.status(500).json({ status: "failed", message: "Internal Server Error." });
  }
};

export default authMiddleware;
