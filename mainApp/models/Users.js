const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    kakaoId: String,
    username: String,
});

module.exports = mongoose.model('User', userSchema);