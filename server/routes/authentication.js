import { Router } from "express";
import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import passport from "passport";
import Message from "../models/messages.js";

const router = Router();

//Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found!" });

    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch)
      return res.status(400).json({ error: "Invalid password!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).cookie("token", token).json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//Signup route
router.post("/signup", async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({
        error: "Account already created with this email try another one!",
      });

    await User.create({
      userName,
      email,
      password,
    });

    res.status(201).json({
      message: "Creating account successfully completed now you can login!",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//profile route
router.post("/profile", async (req, res) => {
  const token = req.cookies["token"];
  if (!token) return res.status(400).json({ error: "login first" });
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.id);
    if (!user) return res.status(400).json({ error: "user not found" });
    const { userName, email, _id } = user;
    res.status(200).json({ userName, email, _id });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//forgotPassword route
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: "user not found!" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const resetLink = `http://localhost:5173/reset-password?reset-token=${token}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_GMAIL,
        pass: process.env.GOOGLE_APP_PASS,
      },
    });

    const message = {
      from: `Chating App ${process.env.GOOGLE_GMAIL}`,
      to: email,
      subject: "RESET PASSWORD",
      html: `<p>Here the reset password link <a href="${resetLink}">Click</a> to reset the password</p>`,
    };

    await transporter.sendMail(message);
    res.cookie("reset-token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    res.status(200).json({ message: "Reset link sent to your mail" });
  } catch (error) {
    res.status(500).json(error);
  }
});

//reset route
router.post("/reset-password", async (req, res) => {
  const { password } = req.body;
  const token = req.cookies["reset-token"];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.id);
    if (!user) return res.status(400).json({ error: "User not found" });

    user.password = password;
    user.save();
    res.status(200).json({ message: "password changed" });
  } catch (error) {
    res.status(400).json({ error: "token expired!" });
  }
});

//google login route
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ error: "authentication failed" });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).cookie("token", token);

  res.redirect(`http://localhost:5173/home`);
});

router.get("/chat/:roomname", async (req, res) => {
  //console.log("worked");
  const { roomname } = req.params;
  try {
    const messages = await Message.find({ roomId: roomname }).sort({
      timeStamp: 1,
    });
    res.status(200).json({ messages });
  } catch (error) {
    console.log(error);
  }
});

export default router;
