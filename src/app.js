const express = require("express")
const app = express();
const path = require('path');
const PORT = 3000;
const mainRouter = require("./routes/mainRoutes");
const authRouter = require("./routes/authRoutes");
const adminRouter = require("./routes/adminRoutes");

app.use(express.static(path.join(__dirname, "../public")));

app.set ("view engine", "ejs");
app.set ("views", path.join(__dirname, "views"));

app.listen(PORT, () => {
    console.log('Servidor corriendo en ' + PORT);
});

app.use("/", mainRouter);
app.use("/auth", authRouter);
app.use("/admin", adminRouter);