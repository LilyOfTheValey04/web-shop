const jwt = require('jsonwebtoken');

// Middleware за проверка на JWT токена
const authMiddleware = (req,res,next)=>{
	
	// проверка на заглавието Authorization за токен
	const authHeader = req.headers['authorization'];
	// вземане на токена от заглавието
	const token = authHeader && authHeader.split(' ')[1];
	
	if(!token){
		return res.status(401).json({message:"Theres not a token"});
	}
	

	jwt.verify(token, 'wtegsabevxyU9gakjQKD', (err, user) =>{
		if(err) return res.status(403).json({message: 'Unvalid token'});
		req.user = user;  // Запазва декодираните данни от токена в обекта `req`
		next(); // Продължава към следващия middleware/рутер
	});
	
	
};

module.exports = authMiddleware;