var express = require('express');
var router = express.Router();
let sign=require("../controller/sign");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get("/login",function (req,res,next) {

});
router.get("/signup",function (req,res,next) {
    if(req.session.log=='true'){
        res.send("您已经登录");
    }
    else{
        res.render('signup');
    }
});
router.get("/signin",function (req,res,next) {
    if(req.session.log=='true'){
       res.redirect('../article');
    }else {
        res.render('signin');
    }
});
router.get("/signout",function (req,res,next) {

});
router.post("/login",function (req,res,next) {

});
router.post("/signup",function (req,res,next) {
        sign.findUser(req.body.name)
            .then((rows)=>{
                if( sign.checkPassword(req.body,rows)){
                    req.session.log='true';
                    req.session.name=req.body.name;
                    res.redirect('../article');
                }else{
                    res.send("账户或密码错误");
                }
            }).catch((err)=>{
            res.send("error");
        })
});
router.post("/signin",function (req,res,next) {
        sign.findUser(req.body.name)
            .then((row)=>{
                if(row.length>0) {
                    res.send("这个账户已经被注册了");
                }else{
                    sign.createNewUser(req.body.name,req.body.password)
                        .then(()=>{
                            req.session.log='true';
                            req.session.name=req.body.name;
                            res.redirect('../article');
                        }).catch(err=>{
                        res.send("false");
                    })
                }
            })
    });
module.exports = router;
