// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Грешен потребител или парола" });
    }

    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
    res.json({ token });

  } catch (err) {
    res.status(500).json({ message: "Сървърна грешка" });
  }
});

router.post("/register",async(req,res)=>{
    try{
   const existingUser = await User.findOne({ 
    $or:[
    {email: req.body.email},
    {username: req.body.username}
    ]
  });
  
   if(existingUser){
     return res.status(400).json({message: "Потребителят вече съществува"});
   }

   const hashedPassword= await bcrypt.hash(req.body.password,10);

   const newUser= new User({
    username: req.body.username,
    email:req.body.email,
    password: hashedPassword
   });

   await newUser.save();
   res.status(201).json({message: "Потребителят е създаден успешно"});
   
    }catch(err){
        res.status(500).json({message: "Сървърна грешка"});
    }
});

module.exports = router;