const express = require('express');
const router = express.Router();
const Product = require('../models/Product')

router.get('/', async (req, res) => {
  try {
      const products = await Product.find();
      res.json(products); // Връща [] ако няма продукти
  } catch (err) {
      res.status(500).json({ error: "Грешка при зареждане" });
  }
});
// Добавяне на нов продукт
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body); // Създава нов обект от данните в заявката
    await newProduct.save() // Запазва го в MongoDB
      // 201 Created за успешно създаване
    res.status(201).json(newProduct);
}catch(err){
   // Ако има грешка при валидация (например липсва име) -> 400 Bad Request
    res.status(400).json({message: err.message }); // Връща грешка, ако не успее
  }
});

// Изтрива продукт по ID
router.delete('/:id', async (req, res) => {
  try{
 const deleteProduct = await Product.findByIdAndDelete(req.params.id); // Търси продукт по ID и го изтрива
 if(!deleteProduct){
    // 404 Not Found, ако не намери продукта
    return res.status(404).json({ message: 'Product not found' });
  }
 // 204 No Content за успешно изтриване
 res.status(204).end();
 } catch(err){
   // 500 Internal Server Error
    res.status(500).json({ message: 'Server error' });
  }

});


module.exports= router;