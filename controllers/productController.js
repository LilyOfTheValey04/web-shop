// controllers/productController.js

const Product = require('../models/Product');
const mongoose = require('mongoose');

//връща вс продукти в index ???
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

// API JSON версия (използва се от JS) за aminPanel ??
exports.getProductByIdJSON = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching product by ID' });
  }
};

// ejs версия (използва се от бутона "See more")
exports.getProductByIdPage = async (req, res) =>{
  try   {
const product = await Product.findById(req.params.id).lean();
if(!product){
 return res.status(404).json({ error: "Продукта не е намерен" });
}

    res.render('product-details',{product});

  } catch(err){
    res.status(500).json({error:"Грешка при извличането на продукта по ID"});
  }
};



exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      image: req.file ? req.file.path : '', // ако има снимка
      description: req.body.description,
      shortDescription: req.body.shortDescription,
      fullDescription: req.body.fullDescription
    });

    
    await newProduct.save();
    
    return res.redirect('/admin');

    } catch (err) {

      
    const products = await Product.find().lean();

 if(err.code === 11000){
return res.status(400).render('adminPanel',{
  products,
   errorMessage: 'Вече съществува продукт с това име.'
});
 }

    res.status(500).render('error', {
      error: 'Грешка при създаване на продукт',
      details: err.message
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      price: req.body.price,
      stock: req.body.stock,
      shortDescription: req.body.shortDescription,
      fullDescription: req.body.fullDescription
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updated) {
      return res.status(404).json({ error: 'Продуктът не е намерен' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Грешка при редактиране на продукта', details: err.message });
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

    res.status(200).json({ message: 'Product deleted successfully' });
      
     } catch(err){
       res.status(500).render('error', {
        error: 'Грешка при изтриване на продукта'
    });
      }
}

exports.addReview = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).render('error', { error: 'Product not found' });
    }

    const review = {
      user: req.user ? req.user._id : null, // Ако имаш login, тук ще е ID-то
        comment: req.body.comment,
      createdAt: new Date()
    };

    product.reviews.push(review);
    await product.save();

    
    res.redirect(`/api/products/${product._id}`);
    

  } catch (err) {
    console.error(err);
    res.status(500).render('error', { error: 'Error while saving review' });
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


