var express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcryptjs');
const register = require('./controllers/register');
const signin = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
});


var app = express();

app.use(express.json());
app.use(cors());


app.post("/signin", (req, res) => { signin.handleSignIn(req, res, db, bcrypt) })

app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.get("/profile/:id", (req, res) => { profile.handleProfile(req, res, db) })

app.put("/image", (req, res) => { image.handleImage(req, res, db) })

app.put("/imageUrl", (req, res) => { image.handleImageUrl(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`its working fine on ${process.env.PORT}!!!`);
})