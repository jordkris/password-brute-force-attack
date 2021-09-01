// Express
const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
// Cors
const cors = require('cors');
const corsOptions = {
    origin: 'https://195.2.81.61/wp-login.php',
    methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// axios
const axios = require('axios');
// app.use(cors(corsOptions));

app.get('/', (req, res) => {
    if (req.query.data != undefined) {
        console.log(req.query.data);
        res.send(req.query.data);
    } else {
        res.render('index.ejs');
    }
});

app.post('/test', (req, res) => {
    // test();
    data = {
        log: req.body.log,
        pwd: req.body.pwd,
    };
    axios.post('http://195.2.81.61/wp-login.php', data)
        .then((result) => {
            // console.log(`Status: ${result.status}`);
            console.log('Body: ', result.data);
            location.href = '/?data='+result.data;
            res.redirect('/test/?data=' + result.data);
        }).catch((err) => {
        console.error(err);
    });
});

app.get('/test', (req, res)=> {
    if (req.query.data != undefined) {
        console.log(req.query.data);
        res.send(req.query.data);
    } else {
        res.render('index.ejs');
    }
});
app.listen(3000);
