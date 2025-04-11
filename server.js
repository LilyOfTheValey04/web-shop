require('dotenv').config();
const express = require('express');
const mongoose= require('mongoose');
const cors=require('cors');
const bodyParser = require('body-parser');

const path = require('path');
const app = express(); 
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

// Свързване с MongoDB

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true

}).then(()=> console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

  // Зареждане на API маршрутите
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {    
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Стартиране на сървъра
app.listen(port, () => { 
    console.log(`Server is running on port ${port}`);
});