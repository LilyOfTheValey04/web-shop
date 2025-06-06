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
    const { firstName, lastName, address, items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No items in order' });
    }

    let totalPrice = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ error: `Product not found: ${item.productId}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ error: `Not enough stock for: ${product.name}` });
      }

      product.stock -= item.quantity;
      product.purchaseCount = (product.purchaseCount || 0) + item.quantity;
      await product.save();

      totalPrice += parseFloat(product.price.toString()) * item.quantity;

      orderItems.push({
        product: product._id,
        quantity: item.quantity
      });
    }

    const newOrder = new Order({
      items: orderItems,
      firstName,
      lastName,
      address,
      price: totalPrice
    });

    await newOrder.save();

    return res.status(201).json(newOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
