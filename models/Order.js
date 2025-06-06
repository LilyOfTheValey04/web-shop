const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }
],

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
        
    type: String,
    required: true
        
    },
    // Референция към потребител
    customer: {  
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

//timestamps: true добавя полета createdAt и updatedAt автоматично

module.exports = mongoose.model('Order', OrderSchema);