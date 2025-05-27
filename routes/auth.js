// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    // Деструктуриране на данните от заявката
    const { username, password } = req.body;

    //търсене на потребителя по потребителско име
    const user = await User.findOne({ username });
    
    // Проверка дали потребителя съществува и дали паролата е правиллна
    // bcrypt.compare() сравнява хешираната парола с въведената парола
    // user.password е хешираната парола, която е записана в базата данни
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Грешен потребител или парола" });
    }

    //Генериране на JWT токен
    // jwt.sign() генерира токен, който съдържа userId на потребителя
    const token = jwt.sign(
      { userId: user._id },
      'wtegsabevxyU9gakjQKD', 
      { expiresIn: '1h' });

      //Връщане на токена в отговора
    // res.json() изпраща JSON отговор на клиента
       res.json({ token });

  } catch (err) {
    res.status(500).json({ message: "Сървърна грешка" });
  }
});

router.post("/register",async(req,res)=>{
    try{
      //Проверка за съществуващ потребител по имейл или потребителско име
  // req.body.email и req.body.username са данните от заявката
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

   //създаване но нов потребител
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

//Експорт на рутера за да се използва в основния файл server.js
module.exports = router;