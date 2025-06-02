const Order = require('../models/Order');
const Product = require('../models/Product'); //

// Получаване на всички поръчки
exports.getOrder = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('product'); // 
    res.json({
      orders,
      message: 'Here are the orders'
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Създаване на нова поръчка
exports.createOrder = async (req, res) => {
  try {
    const product = await Product.findById(req.body.productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.stock < req.body.quantity) {
      return res.status(400).json({ error: 'Not enough stock' });
    }

    const totalPrice = parseFloat(product.price.toString()) * req.body.quantity;

    const newOrder = new Order({
      product: product._id,
      quantity: req.body.quantity,
      customer: {
        name: req.body.name,
        surname: req.body.surname,
        address: req.body.address
      },
      price: totalPrice
    });

    product.stock -= req.body.quantity;
    await product.save();
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
