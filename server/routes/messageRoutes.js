const express = require("express");
const router = express.Router();

const Message = require("../models/message");
const protect = require("../middleware/authMiddleware");


// ==========================================
// RECEIVE CONTACT FORM MESSAGE
// POST /api/messages
// PUBLIC
// ==========================================

router.post("/", async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            subject,
            message
        } = req.body;


        // Validate required fields

        if (!name || !email || !subject || !message) {

            return res.status(400).json({
                success: false,
                message: "Please complete all required fields."
            });

        }


        // Create message

        const newMessage = await Message.create({
            name,
            email,
            phone: phone || "",
            subject,
            message
        });


        res.status(201).json({
            success: true,
            message: "Your message has been received.",
            data: newMessage
        });


    } catch (error) {

        console.error("Message error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to send your message."
        });

    }

});


// ==========================================
// GET ALL MESSAGES
// GET /api/messages
// ADMIN ONLY
// ==========================================

router.get("/", protect, async (req, res) => {

    try {

        const messages = await Message
            .find()
            .sort({ createdAt: -1 });


        res.json({
            success: true,
            count: messages.length,
            data: messages
        });


    } catch (error) {

        console.error("Load messages error:", error);

        res.status(500).json({
            success: false,
            message: "Unable to load messages."
        });

    }

});


// ==========================================
// MARK MESSAGE AS READ
// PATCH /api/messages/:id/read
// ADMIN ONLY
// ==========================================

router.patch("/:id/read", protect, async (req, res) => {

    try {

        const message =
            await Message.findByIdAndUpdate(
                req.params.id,
                {
                    status: "read"
                },
                {
                    new: true
                }
            );


        if (!message) {

            return res.status(404).json({
                success: false,
                message: "Message not found."
            });

        }


        res.json({
            success: true,
            message: "Message marked as read.",
            data: message
        });


    } catch (error) {

        console.error(
            "Mark read error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to update message."
        });

    }

});


// ==========================================
// DELETE MESSAGE
// DELETE /api/messages/:id
// ADMIN ONLY
// ==========================================

router.delete("/:id", protect, async (req, res) => {

    try {

        const message =
            await Message.findByIdAndDelete(
                req.params.id
            );


        if (!message) {

            return res.status(404).json({
                success: false,
                message: "Message not found."
            });

        }


        res.json({
            success: true,
            message: "Message deleted successfully."
        });


    } catch (error) {

        console.error(
            "Delete message error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to delete message."
        });

    }

});


module.exports = router;