// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require("../controllers/authControllers");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
  
//Експорт на рутера за да се използва в основния файл server.js
module.exports = router;