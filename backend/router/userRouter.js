
const express = require("express");
const {registerUser,loginUser} =require("../Controller/userController.js");
const { verifyToken } = require("../middleware/auth.js");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", verifyToken,(req, res) => {
    res.status(200).json({ message: 'Welcome' });
  });
module.exports = router;