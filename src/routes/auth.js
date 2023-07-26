module.exports = {
  CheckAuth: async function (req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect("/user/signin");
    }
  },
};
