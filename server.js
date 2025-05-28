require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// EJS темплейти
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//acsses to folder uploads
app.use('/uploads', express.static('uploads'));
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Маршрути
const productRouter = require('./routes/products');
const orderRouter = require('./routes/orders');
const authRouter = require('./routes/auth');

app.use('/api/products', productRouter); // Начална страница и продукти
app.use('/api/orders', orderRouter);
app.use('/api/auth', authRouter);

// Свързване към MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

  // Начална страница с продукти
app.get('/', async (req, res) => {
  try {
    const Product = require('./models/Product');
    const products = await Product.find().lean();
    res.render('index', { products, isEmpty: products.length === 0 });
  } catch (err) {
    res.status(500).render('error', { error: 'Грешка при зареждане на началната страница' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

