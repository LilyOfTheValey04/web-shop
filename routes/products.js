const express = require('express');
const router = express.Router();
const Product = require('../models/Product')

// Връща всички продукти
router.get('/',async (req, res)=>{
    const products = await Product.find(); // Извлича всички продукти от базата данни
    if(!products) return res.status(404).json({message:"No products found"})
res.json(products)
});

// Добавяне на нов продукт
router.post('/', async (req, res) => {
    const newProduct = new Product(req.body); // Създава нов обект от данните в заявката
    await newProduct.save() // Запазва го в MongoDB
    res.json(newProduct);
});

// Изтрива продукт по ID
router.delete('/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id); // Търси продукт по ID и го изтрива
  res.json({ message: 'Product deleted' });
});


module.exports= router;