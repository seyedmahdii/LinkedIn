import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import usersRoutes from "./routes/users.js";
import postsRoutes from "./routes/posts.js";

// App config
const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("This is Linkedin");
});

// Middlewares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/users", usersRoutes);
app.use("/", postsRoutes);

// Listener
app.listen(PORT, () => {
    console.log(`Server running on PORT : http://localhost:${PORT}`);
});
