const connection=require('../connection');
const e = require('express');

exports.login=(username,password,result)=>{
    
    connection.query("SELECT * from user where username=? and password=?",[username,password],(err,res)=>{
        if(err)
            result(err,null);
        else
        {
            result(null,res);    
        }    
    });
};

exports.signup=(username,password,result)=>{
    connection.query("Insert into user values (?,?)",[username,password],(err,res)=>{
        if(err)
            result(err,null);
        else
            result(null,res);    
    });
}

exports.getimages=(result)=>{
    connection.query("SELECT * from image",(err,res)=>{
        if(err)
            result(err,null);
        else
            result(null,res);    
    });
}

exports.store_image=(filename,result)=>{
    connection.query("Insert into image(image_name) values(?)",filename,(err,res)=>{
        if(err)
            result(err,null);
        else
            result(null,res);    
    })
}