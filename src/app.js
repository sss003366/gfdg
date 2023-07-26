import express from "express";
import passport from "passport";
import session from "express-session";
import flash from "connect-flash";
import dotenv from "dotenv";

import mainRouter from "./routes/index";
import dustRouter from "./routes/dust";
import userRouter from "./routes/user";
import newsRouter from "./routes/news";
import wifiRouter from "./routes/wifi";

import passportConfig from "./passport";

dotenv.config();
const PORT = process.env.SERVER_PORT ?? 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// auth pass port inital option..
passportConfig();
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "sessionsecretsessionsecret",
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set("views", `${__dirname}/views`);
app.set("view engine", "ejs");

app.use("/", mainRouter);
app.use("/dust", dustRouter);
app.use("/user", userRouter);
app.use("/news", newsRouter);
app.use("/wifi", wifiRouter);

function handleListen() {
  console.log(`Listening on port: http://localhost:${PORT}`);
}

app.listen(PORT, handleListen);
