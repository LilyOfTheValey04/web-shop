const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const OrderController = require('../controllers/orderController');
//const authMiddleware = require('../middleware/authMiddleware');


//not implemented
//router.post('/',authMiddleware, orderController.createOrder);
//router.get('/',authMiddleware, orderController.getOrder);

router.post('/', OrderController.createOrder);
router.get('/', OrderController.getOrder);


module.exports= router;