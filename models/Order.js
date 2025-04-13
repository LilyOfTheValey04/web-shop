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
    // Лични данни (съхранени в поръчката за историческа точност)
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
    // Референция към потребител (ако има регистрация)
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Незадължително за гости
    },
    // Цената на продукта в момента на поръчката
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