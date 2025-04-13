const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product',required: true },
    quantity: {
        type: Number,
        required: true,
        min: 1 // Минимално количество
    },
    customerName: {
        type: String,
        required: true
    },
   
  price: {
         type: mongoose.Types.Decimal128,
           required: true
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        purchaseDate: {
            type: Date,
            default: Date.now
        }
    }, { timestamps: true });


module.exports = mongoose.model('Order', OrderSchema);