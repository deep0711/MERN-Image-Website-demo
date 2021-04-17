const express=require('express');
const fileupload=require('express-fileupload');
const bodyparser=require('body-parser');
const connnection=require('./connection');
const Router=require('./route/route')
const cors = require('cors');
require('dotenv').config();
path=require('path');

const app=express();

app.use(bodyparser.urlencoded({ extended: true })); 
app.use(cors());
app.use(bodyparser.json());
app.use(fileupload());
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/',Router);
app.set('view engine', 'ejs');
app.listen(8000);