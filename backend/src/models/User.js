const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
}, {timestamps: true});  

User.pre('save', async function(next) {
    const hash = await bcryptjs.hash(this.password, 10);
    this.password = hash;
    next();
});

module.exports = mongoose.model("User", User);