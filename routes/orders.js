const express= require('express');
const router = express.Router();
const Order = require('../models/Order');

// Създаване на нова поръчка
router.post('/',async(req,res)=>{
    try{
    const newOrder = new Order(req.body);
    await newOrder.save()
    res.status(201).json(newOrder);
}catch(err){
    res.status(500).json({message:err.message});
}
});

// Получаване на всички поръчки
router.get('/',async (req,res)=>{
    try{
    const orders = await Order.find().populate('productId');
    res.json({order,message:'Here are the orders'});
    }
    catch(err){
        res.status(500).json({message:"Server error"}); 
    }
});

module.exports= router;