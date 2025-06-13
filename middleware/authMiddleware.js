const jwt = require('jsonwebtoken');

// Middleware за проверка на JWT токена


const authMiddleware = (req,res,next)=>{
	
	// проверка на заглавието Authorization за токен
	//const authHeader = req.headers['authorization'];
	// вземане на токена от заглавието
	//const token = authHeader && authHeader.split(' ')[1];

	const token = req.cookies?.token;
	
	/*if(!token){
		return res.status(401).json({message:"Theres not a token"});
	}*/
if (!token) {
  return res.redirect("/login");
}


	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
		if(err) return res.status(403).json({message: 'Unvalid token'});
		req.user = decoded;  // Запазва декодираните данни от токена в обекта `req`
		next(); // Продължава към следващия middleware/рутер
	});
};

const isAdmin = (req,res,next) =>{
	if(req.user?.role !== 'admin'){
		return res.status(403).json({ message: "Admin access only"});
	}
	next();
}

module.exports = {authMiddleware, isAdmin};