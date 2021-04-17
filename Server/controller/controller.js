require('dotenv').config();
const jwt = require('jsonwebtoken');

const image=require('../model/model');
const connection = require('../connection');

exports.gettoken=(req,res)=>{
    
    image.login(req.body.username,req.body.password,(err,user)=>{
        if(err)
            res.status(500).send(err);
        else
        {
            if(user.length===1)
            {
                const payload={
                    id:user[0].username
                }

                const token=jwt.sign(payload,process.env.JWT_KEY,{expiresIn:'30d'});
                data={
                    token:token,
                    username:req.body.username
                }
                res.send(data);
            }
            else
                res.send(null);
        }    
    });
};

exports.signup=(req,res)=>{
    image.signup(req.body.username,req.body.password,(err,user)=>{
        if(err)
            res.send(null);
        else
            res.send(user);    
    });
}

exports.getuser=(req,res)=>{
    if(req.headers && req.headers.authorization)
    {
        const token=req.headers.authorization.split(' ')[1];
        
        var decoded;

        try{
            decoded=jwt.verify(token,process.env.JWT_KEY);
        }catch(err){
            res.send(err)
        }
        res.send(decoded.id);
    }
}

exports.getimages=(req,res)=>{
    image.getimages((err,images)=>{
        if(err)
            res.send(null);
        else
            res.send(images);    
    })
}

exports.upload_image=(req,res)=>{
    
    var file=req.files.file;
    var filename=req.files.file.name;

    try{
    image.store_image(filename,(err,image)=>{
        if(err)
            res.send(null);
        else
        {
            
            let reqPath = path.join(__dirname, '../../');
            var address=reqPath+'\\Client\\demo\\src\\image\\'+image.insertId+filename;
            
            if(file.mimetype=='image/jpeg' || file.mimetype=='image/png' || file.mimetype=='image/gif'){

                file.mv(address,err=>{
                    if(err)
                    {
                        console.log("Error Occured",err);
                        res.send(null);
                    }
                    else
                    {
                        res.send('Image Uploaded Successfully');
                    }
                });
            }
        }    
    })
    }catch(err){
        res.send(null);
    }
}