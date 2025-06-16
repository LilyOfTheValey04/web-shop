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

const upload = multer({ storage }); // инстанция на multer с конфигурацията

// Създава нов продукт
router.post('/', upload.single('image'), productController.createProduct);

// Масив от продукти за админ и индекс
router.get('/', productController.getAllProducts);

// Създава ревю за продукт по ID
router.post('/:id/review', productController.addReview);

// API маршрут за JS (loadProduct) за админ паела
router.get('/:id/json', productController.getProductByIdJSON);

// Актуализация на продукт
router.put('/:id', upload.single('image'), productController.updateProduct);

// Изтриване на продукт
router.delete('/:id', productController.deleteProduct);

// HTML страница за See More (admin/product page)
router.get('/:id', productController.getProductByIdPage);

module.exports = router;
