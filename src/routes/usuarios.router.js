const express = require("express");
const router = express.Router();
const {usuario} = require("../models/user.model");
const { createHash, isValidatePassword } = require("../../utils");
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.get("/login", async (req, res) => {
  res.render("login");
});

/* 
router.get("/", async(req, res) => {
  try {
      let users = await userModel.find()
      res.send({result: "success", payload: users})
  } catch (error) {
      console.log(error)
  }
}) */


router.get("/profile", async (req, res) => {
  if (!req.session.user) {
    return res.redirect("login");
  }

  const { first_name, last_name, email, age } = req.session.user;

  res.render("profile", { first_name, last_name, age, email });
}); 

router.post("/", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name ||  !email || !password)
  return res.send({status: error, error: "Obligatorio completar los campos"})

  
  let result = await userModel.create({first_name, last_name, email, password})
  res.send({result: "Success", payload: result})

  if (!user) {
    return res.status(400).render("login", { error: "Usuario no encontrado" });
  }

  if (!isValidatePassword(user, password)) {
    return res.status(401).render("login", { error: "Error en password" });
  }


  res.redirect("/api/usuarios/profile");
});

router.get("/logout", async (req, res) => {
  delete req.session.user;
  res.redirect("login");
});


//en esta seccion si queremos modificar algun dato de usuario creado y como condiciones verificar al completar campos y mostrar dicho resultado 
router.put("/:uid", async(req, res) =>{
  let { uid } = req.params

  let userToReplace = req.body
  if(!userToReplace.first_name || !userToReplace.last_name || !userToReplace.email) {
      res.send({status: "error", error: "completar campos"})
  }
  let result = await userModel.updateOne({_id: uid}, userToReplace)
  res.send({result: "Success", payload: result})
})

//eliminar usuario por id
router.delete("/:uid", async(req, res) => {
  let uid = req.params
  let result = await userModel.deleteOne({_id: uid})
  res.send({result: "Success", payload: result})
})

router.get("/faillogin", async (req, res) => {
  console.log("Hubo un error en la autenticación");
  res.send({ error: "Error en la autenticación" });
});




//en esta ruta vamos a capturar el mail del user.
router.post("/login", (req, res) => {
  const {email, password} = req.body
  
  if(email == "felipel@gmail.com" && password == "12345"){
      let token = jwt.sign({email, password}, "coderSecret", {expiresIn: "24h"})
      res.cookie("coderCookieToken", token, {
          maxAge: 50*50*1000,
          httpOnly: true
      }).send({message: "Usuario ingresado con exito" })
  }else {
      res.render("failregister")
  }
})

router.get("/current", passport.authenticate("jwt", {session: false}), (req, res) =>{
  res.send(req.user) 
})


module.exports = router;
