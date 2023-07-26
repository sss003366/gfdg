const express = require("express");
const router = express.Router();
const auth = require("./auth");

router.get("/", auth.CheckAuth, function (req, res) {
  res.render("index");
});

export default router;
