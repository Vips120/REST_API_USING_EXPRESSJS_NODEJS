let express = require('express');
let router = express.Router();
let multer = require('multer');
let image = require('../schema/image.schema');
const { route } = require('./auth/user');
let port = "http://localhost:4200"; // https://www.xyz.com

let storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename:function(req,file,cb){
        cb(null, file.originalname)
    }
});

let fileFilter = function(req,file,cb){
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
        cb(null,true);
    } else {
        cb(null,false);
    }
};

let upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024 * 1024 * 5  // 1*1*5 = 5mb
    },
    fileFilter:fileFilter
});

router.post('/fileupload', upload.single('image'), async(req,res) => {
    console.log(req.file);
    let fileupload = new image({
        image:port + "/uploads/" + req.file.filename
    });
    let data = await fileupload.save();
    res.send(data);
})

module.exports = router;

//https://www.xyz.com/uploads/a.jpg
