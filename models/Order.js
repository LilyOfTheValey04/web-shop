const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
        required: true 
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    // Лични данни
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
            required: true
        }
    },
    // Референция към потребител
    customer: {  // <--- БЕЗ ДУБЛИРАНЕ! Това е единственото определение
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);