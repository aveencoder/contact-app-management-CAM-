import express from "express";
const app = express();
import ContactRoutes from "./routes/contacts.routes.js";
import { connectDB } from "./config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import User from "./models/User.js";
app.use(cookieParser());
import auth from "./middleware/auth.js";

const JWT_SECRET = "contacthub_secret_key";
const PORT = process.env.PORT;

// Database Connection
connectDB();

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("Invalid Email");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send("Invalid Password");
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");

  res.redirect("/login");
});

// Routes
app.use("/", ContactRoutes);

app.listen(PORT, () => {
  console.log(`Server started Successfully on port http://localhost:${PORT}.`);
});
