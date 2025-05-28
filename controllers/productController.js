// controllers/productController.js

const Product = require('../models/Product');
const mongoose = require('mongoose');


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();

    res.render('index', { 
    products: products,
    isEmpty: products.length ===0
    }); // Връща [] ако няма продукти
  } catch (err) {
    res.status(500).json({ error: "Грешка при извличане на продуктите" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      image: req.file ? req.file.path : '', // ако има снимка
      shortDescription: req.body.shortDescription,
      fullDescription: req.body.fullDescription
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: 'Невалидни данни', details: err.message });
  }
};
/*exports.createProduct = async (req, res) => {
  try {
  const newProduct = new Product({
  ...req.body,
  image: req.file.path, // път до снимкат
  price: mongoose.Types.Decimal128.fromString(req.body.price.toString())
});

    await newProduct.save(); // Запазва го в MongoDB
   // res.redirect('/products'); // Пренасочва към списъка с продукти !!!!
   res.status(201).json({ message: 'Продуктът е добавен успешно', product: newProduct });

  } catch (err) {
    res.status(400).json({ error: 'Невалидни данни', details: err.message });


   // res.render('create-product-form', {
    //  error: 'Невалидни данни', 
    //  oldInput: req.body // Връщаме въведените данн
   //    });
  }
};*/

exports.deleteProduct = async (req,res) =>{
    try{
     const deleteProduct = await Product.findByIdAndDelete(req.params.id); // Търси продукт по ID и го изтрива
     if(!deleteProduct){
        // 404 Not Found, ако не намери продукта
        return res.status(404).render('error', {
      error: 'Грешка при изтриване на продукта'
    });
      }

      res.redirect('/products');
     } catch(err){
       res.status(500).render('error', {
        error: 'Грешка при изтриване на продукта'
    });
      }
}
