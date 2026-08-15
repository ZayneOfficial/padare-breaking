const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();


// ==========================================
// ADMIN LOGIN
// POST /api/auth/login
// ==========================================

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;


        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });

        }


        // Check admin email

        if (
            email.toLowerCase() !==
            process.env.ADMIN_EMAIL.toLowerCase()
        ) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });

        }


        // Compare password

        const passwordMatches =
            await bcrypt.compare(
                password,
                await bcrypt.hash(
                    process.env.ADMIN_PASSWORD,
                    10
                )
            );


        if (!passwordMatches) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });

        }


        // Create JWT

        const token = jwt.sign(
            {
                email: process.env.ADMIN_EMAIL,
                role: "admin"
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "8h"
            }
        );


        res.json({
            success: true,
            message: "Login successful.",
            token
        });


    } catch (error) {

        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to login."
        });

    }

});


module.exports = router;