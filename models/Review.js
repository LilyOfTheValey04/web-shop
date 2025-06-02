const mongoose = require('mongoose');

const  ReviewSchema = new mongoose.Schema({
    name :{
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    costemerReview :{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Review', ReviewSchema);
