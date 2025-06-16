const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST /api/auth/login
exports.login = async(req, res) => {
  try {
    // Деструктуриране на данните от заявката
    const { username, password } = req.body;

    //търсене на потребителя по потребителско име
    const user = await User.findOne({ username });
    
    // Проверка дали потребителя съществува и дали паролата е правиллна
    // bcrypt.compare() сравнява хешираната парола с въведената парола
    // user.password е хешираната парола, която е записана в базата данни
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    //Генериране на JWT токен
    // jwt.sign() генерира токен, който съдържа userId на потребителя
    const token = jwt.sign(
      { userId: user._id,
        role: user.role },
        process.env.JWT_SECRET, 
      { expiresIn: '1h' });

      //Създай cookie
      res.cookie("token", token,{
        httpOnly: true, // Защита от достъп през JS
        maxAge: 60*60*1000,
     
      });
   // console.log(" Token sent in cookie:", token);//лог
      //Връщане на токена в отговора
    // res.json() изпраща JSON отговор на клиента
       res.json({ token, user: {username: user.username, role: user.role} });


  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = (req,res) =>{
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
}

exports.register = async(req,res)=>{
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
     return res.status(400).json({message: "User already exists"});
   }
   
   //създаване но нов потребител
   const newUser= new User({
    username: req.body.username,
    email:req.body.email,
    password: req.body.password
   });

   await newUser.save();
   res.status(201).json({message: "User created successfully"});
   
    }catch(err){
        res.status(500).json({message: ""});
    }
};

