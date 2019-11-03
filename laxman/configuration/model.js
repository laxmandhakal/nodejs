const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const password = new mongoose.Schema({
    "username": { type: String, required: true, unique: true },
    "password": { type: String, required: true },
    "New": [{ type: mongoose.Schema.Types.ObjectId, ref: "seed" }]
})
const New = new mongoose.Schema({
    "firstname": { type: String, default: "Hari" },
    "lastname": { type: String, default: "Khanal" },
    "sec": { type: String, default: "A" },
    "class": { type: Number, default: 0 }
})

password.pre("save", async function(next) {
    hashed = await bcrypt.hash(this.password, 10)
    this.password = hashed
})
var seed = mongoose.model("seed", New)
var login = mongoose.model('login', password)
module.exports = { seed, login }