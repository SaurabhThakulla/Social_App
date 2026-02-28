import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "./auth.service";

const router = Router();

/* ================= SIGNUP ================= */

router.post("/signup", async function (req, res) {
    const { name, username, email, password } = req.body;

    try {
        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                error: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await createUser(
            name,
            username,
            email,
            hashedPassword
        );

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Signup failed" });
    }
});

/* ================= LOGIN ================= */

router.post("/login", async function (req, res) {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed" });
    }
});

export default router;