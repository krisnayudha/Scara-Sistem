const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const bcrypt = require('bcrypt');
const port = 3000;

const {loadUser, saveDataUser} = require('./utils/userData');
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

app.get('/home', (req, res) => {
    res.send("INI HOME");
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
        res.redirect('/sign-in-sign-up');
    }
    console.log(loadUser());
    // console.log(users);
});

app.post('/login', async(req, res) => {
    try {
        // load users.json
        // ambil data users dan di compare antara username dan password
        const username = req.body.username;
        const password = req.body.password;
        const users = loadUser();
        // const checkUser = users.find((user) => {
        //     if (user.username === username) {
        //         bcrypt.compare(password, user.password, (err, res) => {
        //             if (res) {
        //                 console.log('your pass is matched');
        //                 return res;
        //             }else{
        //                 console.log('your pass is not match');
        //                 return false;
        //             }
        //         });
        //     }
        //     // return true;
        // });

        const getUser = users.find((user) => user.username === username);
        const getPass = users.find((user) => {
            if(bcrypt.compare(password, user.password)){
                return true;
            };
        });

        if (getUser && getPass) {
            return res.redirect('/home');
        }

        console.log(getUser);
        console.log(getPass);

        // console.log(checkUser);
        // console.log(username);
    } catch {
        
    }
    // res.send(req.body)
})



app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})