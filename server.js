const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());


const json_file = './data.json';
app.get('/archive', (req,res) => {
    res.json(require(json_file));
})

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getTweets', (req,res) => {
    console.log("hello");
    return res.status(200).json({message: "OK"});
})
module.exports = app;

const http = require('http');

const port = 3000;

const server = app.listen(3000, () => {
    console.log(`Server is connected at port: ${port}`);
})


