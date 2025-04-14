const express= require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

// Създаване на нова поръчка
router.post('/',async(req,res)=>{
    try{ 
        const product = await Product.findById(req.body.productId);
        if (!product){
            return res.status(404).json({message: 'Product not found'}); // Проверка дали продуктът съществува
        }

        if(product.stock<req.body.quantity){
            return res.status(400).json({message: 'Not enough stock'}); // Проверка за наличност
        }

    const totalPrice = parseFloat(product.price.toString()) * req.body.quantity; // Изчислява цената на поръчката

    const newOrder = new Order({
        ...req.body, // Взима данните от заявката
        price:totalPrice// Добавя цената
        });
    product.stock -= req.body.quantity; // Намалява наличността на продукта
    await newOrder.save()
    res.status(201).json(newOrder);

}catch(err){
    res.status(500).json({message:err.message});
}
});

// Получаване на всички поръчки
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('productId')    // Продукти
            .populate('customer');   // Потребители

        res.json({ 
            orders,  // Връща поръчките
            message: 'Here are the orders' 
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" }); 
    }
});

module.exports= router;