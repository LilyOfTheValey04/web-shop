const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role : {type: String, required: true, enum: ['user', 'admin'],default: 'user'},
}, { timestamps: true });  

// Хеширане на паролата
userSchema.pre("save", async function(next){
if(!this.isModified("password")) return next();
this.password = await bcrypt.hash(this.password, 10);
next();
});
    
module.exports = mongoose.model('User', userSchema); // Export the User model based on the schema