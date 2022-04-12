const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const bcrypt = require('bcrypt');
const port = 3000;


const {loadUser, saveDataUser, findUser} = require('./utils/userData');
//users

// use ejs
app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.urlencoded({extended: false}));

// set static folder
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/sign-in-sign-up');
});

app.get('/sign-in-sign-up', (req, res) => {
    res.render('login', {
        title : 'login system',
        layout : 'layouts/main-layout',
        style : 'style/login.css'
    });
})

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const users = loadUser();
        users.push({
            id: Date.now().toString(),
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        saveDataUser(users);
        res.redirect('/sign-in-sign-up');
    } catch {
        res.redirect('/');
    }
    console.log(loadUser());
    // console.log(users);
});

app.post('/login', async(req, res) => {
    try {
        // load users.json
        // ambil data users dan di compare antara username dan password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const users = loadUser();

    } catch {
        
    }
})



app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})