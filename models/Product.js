const mongoose = require('mongoose');
const { Decimal128 } = mongoose.Types; // Изисква се явен импорт

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
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
        type: Decimal128, 
        required: true,
        get: v => parseFloat(v.toString()), // Конвертиране към число
        set: v => Decimal128.fromString(v.toFixed(2)) // Запазва 2 дес. знака
    },
    image: { 
        type: String, 
        required: true,
        match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i // Валидация за URL
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
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comment: {
            type: String,
            maxlength: 500
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