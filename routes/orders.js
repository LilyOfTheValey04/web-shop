const express= require('express');
const router = express.Router();
const path = require('path');
const orderController = require('./controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');


//not implemented
//router.post('/',authMiddleware, orderController.createOrder);
//router.get('/',authMiddleware, orderController.getOrder);

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrder);


module.exports= router;