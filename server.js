require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

//  Настройка за EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//  Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//  Външни маршрути (Router-и)
const productRouter = require('./routes/products');
const orderRouter = require('./routes/orders');
const authRouter = require('./routes/auth');

//  Използване на API маршрути
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/auth', authRouter);

//  Начална страница (рендира EJS)
app.get('/', (req, res) => {
  res.render('index'); // Това ще търси views/index.ejs
});

//  Свързване с MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

//  Стартиране на сървъра
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
