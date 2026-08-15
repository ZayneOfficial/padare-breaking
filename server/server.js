const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");

dotenv.config();

const app = express();


// ==========================================
// DATABASE
// ==========================================

connectDB();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
    cors({
        origin: [
            "http://localhost:5500",
            "http://127.0.0.1:5500"
        ],
        methods: ["GET", "POST", "PATCH", "DELETE"],
        allowedHeaders: [
            "Content-Type",
            "Authorization"
        ]
    })
);

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


// ==========================================
// ROUTES
// ==========================================

const messageRoutes =
    require("./routes/messageRoutes");

const authRoutes =
    require("./routes/authRoutes");


app.use(
    "/api/messages",
    messageRoutes
);

app.use(
    "/api/auth",
    authRoutes
);


// ==========================================
// DASHBOARD
// ==========================================

app.use(
    "/dashboard",
    express.static(
        path.join(__dirname, "public")
    )
);


// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/api/health", (req, res) => {

    res.json({
        success: true,
        message: "Padare backend is running."
    });

});


// ==========================================
// SERVER
// ==========================================

const PORT =
    process.env.PORT || 5000;


app.listen(
    PORT,
    "0.0.0.0",
    () => {

        console.log(
            `Padare server running on http://localhost:${PORT}`
        );

        console.log(
            `Dashboard: http://localhost:${PORT}/dashboard/dashboard.html`
        );

    }
);