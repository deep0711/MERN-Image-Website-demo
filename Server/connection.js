const mysql=require('mysql');

//Connection Requirements
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"XXXXX",
    database:"demo",
    insecureAuth:true
});

//Connecting to Databse
connection.connect((err)=>{
    if(err)
        console.log("Connection failed due to:",err);
    else
        console.log("Database Connected");    
});

//Checking if user table exists in Database or not.If do not exits it will create one
//User Table is used of keeping records of all registered user 
connection.query("SELECT * from user",(err,user)=>{
    if(!user)
    {
        connection.query("Create Table user(username varchar(100) Primary Key,password varchar(100))",(err,user)=>{
            if(err)
                console.log("Error in creating User Table.",err);
            else
                console.log("User Table created successfully");    
        })
    }
    else
        console.log("User Table Already there in Database");
});

//Checking if Image table exists in Database or not.If do not exits it will create one
//Image table is used for storing address of image.The image in real will be stored in local system and its address will be stored on database
connection.query("SELECT * from image",(err,image)=>{
    if(!image)
    {
        connection.query("Create Table image(image_id int Primary Key AUTO_INCREMENT,image_name varchar(200))",(err,user)=>{
            if(err)
                console.log("Error in creating image Table.",err);
            else
                console.log("Image Table created successfully");    
        })
    }
    else
        console.log("Image Table Already there in Database");
})

module.exports=connection;