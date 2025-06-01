const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productController = require('../controllers/productController');

// Конфигурация за качване на снимка
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

//const upload = multer({storage:storage});

router.post('/', upload.single('image'),productController.createProduct);
router.get('/', productController.getAllProducts);


// API JSON версия (използва се от JS)
//router.get('/api/:id', productController.getProductByIdJSON);

// API маршрут, който връща JSON
router.get('/:id/json', productController.getProductByIdJSON);

// HTML страница
router.get('/:id', productController.getProductByIdPage);

router.put('/:id', upload.single('image'), productController.updateProduct);

router.delete('/:id',  productController.deleteProduct);

module.exports = router;