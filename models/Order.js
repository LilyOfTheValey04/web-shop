const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    customerName: String,
    customerEmail: String,
});

module.exports = mongoose.model('Order', OrderSchema);