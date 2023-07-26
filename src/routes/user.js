import { Router } from "express";
import UserModel from "../models/user";
import bkfd2Password from "pbkdf2-password";
import passport from "passport";

const hasher = bkfd2Password();
const router = Router();

router.get("/signup", async function (req, res) {
  res.render("signup");
});
router.post("/signup", async function (req, res) {
  const id = req.body.id;
  const password = req.body.password;
  const name = req.body.name;
  const email = req.body.email;
  console.log(id, password, name, email);

  hasher({ password: password }, async function (error, pass, salt, hash) {
    var user = {
      id: id,
      password: hash,
      salt: salt,
      name: name,
      email: email,
    };
    const result = await UserModel.AddUser(user);
    if (result.error) {
      console.log(result.error);
      res.redirect("/user/signup");
    } else {
      console.log("USER CREATED");
      res.redirect("/user/signin");
    }
  }); //hasher
});

router.get("/signin", async function (req, res) {
  res.render("signin");
});
router.post(
  "/signin",
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/user/signin",
  })
);
router.get("/signout", function (req, res, next) {
  req.logout(function (error) {
    if (error) {
      return next(error);
    }
    res.redirect("/");
  });
});

export default router;
