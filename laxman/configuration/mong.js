const express = require("express")
const mongoose = require("mongoose")
const app = express()
const morgan = require("morgan")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Secret = "laxmandhk"
const server = 'localhost:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'here'; // REPLACE WITH YOUR DB NAME
const { seed, login } = require("./model")
mongoose.connect(`mongodb://${server}/${database}`)
    .then(() => {
        console.log('Database connection successful')
    })
    .catch(err => {
        console.error('Database connection error')
    })
app.post("/id/:id", function(req, res) {
    console.log(req.query)
    seed.findById(req.params.id).then(News => {
            res.json({ confirmation: "success", data: News })
        })
        .catch(err => { res.json({ confirmation: "fail", message: err.message }) })
})
app.get("/register", async function(req, res, next) {
    await login.create(req.body, async function(err, done) {
        if (err) {
            return next(err)
        }
        const { firstname, lastname } = done
        token = jwt.sign({ "firstname": firstname, "lastname": lastname }, Secret)
        res.json({ "token": token, "data": done })

    })
})
app.get("/login", function(req, res, next) {
    login.findOne({ "username": req.body.username }).populate({ path: "New", select: "firstname", model: "seed" })
        .then(async function(dones) {
            console.log(dones)
            const { username, password } = dones
            await bcrypt.compare(req.body.password, password, function(err, done) {
                if (err) {
                    console.log(err)
                    return next(err)
                }
                token = jwt.sign({ "username": username, "password": password }, Secret)

                res.json({ "token": token, "data": dones })
            })
        })
        .catch(function(err) {
            return next(err)
        })

})
app.get("/access", function(req, res, next) {
    seed.create({ "firstname": "laxman", "lastname": "dhakal", "sec": "A", "class": 1 }, function(err, done) {
        if (err) {
            next(err)
        }

        res.json(done)
    })

})
app.use(function(err, req, res, next) {
    res.json({ "error in execution": err.message })
})
app.listen(3100)