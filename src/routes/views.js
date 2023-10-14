const express = require("express");
const router = express.Router();

//esta rute me sirve para direccionar si mi usuario no hizo login.
router.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  //en esta const recupera la inf del usuario
  const { first_name, last_name, email, age } = req.session.user;
  res.render("profile", { first_name, last_name, email, age });
});

module.exports = router;
