// controllers/productController.js
const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();

    res.render('products', { 
    products: products,
    isEmpty: products.length ===0
    }); // Връща [] ако няма продукти
  } catch (err) {
    res.status(500).json({ error: "Грешка при извличане на продуктите" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body); // Създава нов обект от данните в заявката
    await newProduct.save(); // Запазва го в MongoDB
    res.redirect('/products'); // Пренасочва към списъка с продукти
  } catch (err) {
    res.render('create-product-form', {
      error: 'Невалидни данни', 
      oldInput: req.body // Връщаме въведените данн
       });
  }
};

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
