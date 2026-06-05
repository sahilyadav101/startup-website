console.log("STARTING SERVER...");

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("SkyVision API Running 🚀");
});

// ADMIN LOGIN
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
    ) {
        const token = jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.json({
            success: true,
            token
        });
    }

    res.status(401).json({
        success: false,
        message: "Invalid credentials"
    });
});

// TEMPORARY TEST ROUTE


app.post("/contact", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        await pool.query(
            `
            INSERT INTO contacts (name, email, message)
            VALUES ($1, $2, $3)
            `,
            [name, email, message]
        );

        console.log("Lead Saved:");
        console.log({
            name,
            email,
            message
        });

        res.status(200).json({
            success: true,
            message: "Lead saved successfully"
        });

    } catch (error) {
        console.error("Database Error:", error);

        res.status(500).json({
            success: false,
            message: "Database Error"
        });
    }
});

app.get("/leads", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM contacts ORDER BY created_at DESC"
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch leads"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});