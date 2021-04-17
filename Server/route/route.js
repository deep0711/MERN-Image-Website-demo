const express=require('express');
const Router=express.Router();
const controller=require('../controller/controller');
const mysql=require('mysql');
const connection=require('../connection');


Router.post('/gettoken',controller.gettoken);
Router.post('/signup',controller.signup);
Router.get('/getuser',controller.getuser);
Router.get('/getimages',controller.getimages);
Router.post('/upload_image',controller.upload_image);

module.exports=Router;