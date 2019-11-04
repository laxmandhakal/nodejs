const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        sparse: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: Number,
    dob: Date,
    status: {
        type: Boolean,
        default: true
    },
    address: String,
    role: {
        type: Number,
        default: 2 // 1 for admin, 2 for normal user, 3 visitor
    },
    updatedBy: String
}, {
        timestamps: true
    });

const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;
