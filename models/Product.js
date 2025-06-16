const mongoose = require('mongoose');
//const validator = require('validator');

const { Decimal128 } = mongoose.Types; // Изисква се явен импорт

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
   
    stock: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: Number.isInteger,
            message: 'Stock must be an integer'
        }
    },
    price: { 
  type: mongoose.Schema.Types.Decimal128,
  required: true
},

  image: { 
  type: String, 
  required: true,
},

    shortDescription: { 
        type: String, 
        required: true,
        maxlength: 160 
    },
    fullDescription: { 
        type: String, 
        required: true 
    },
    purchaseCount: {
    type: Number,
    default: 0  
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comment: {
            type: String,
            maxlength: 500,
            required: true
        },    
    
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, { 
    timestamps: true,
    toJSON: { 
        getters: true,
        virtuals: true 
    },
    toObject: { 
        getters: true,
        virtuals: true 
    }
});
module.exports = mongoose.model('Product', ProductSchema);