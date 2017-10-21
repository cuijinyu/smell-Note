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
    res.render('signup');
});
router.get("/signin",function (req,res,next) {
  res.render('signin');
});
router.get("/signout",function (req,res,next) {

});
router.post("/login",function (req,res,next) {

});
router.post("/signup",function (req,res,next) {
        sign.findUser(req.body.name)
            .then((rows)=>{
                if( sign.checkPassword(req.body,rows)){
                    res.send("登录成功");
                }else{
                    res.send("登录失败");
                }
            }).catch((err)=>{
            res.send("error");
        })
});
router.post("/signin",function (req,res,next) {
    if(req.session.log==undefined||req.session.log==false){
        sign.findUser(req.body.name)
            .then((row)=>{
                if(row.length>0) {
                    res.send("This id has been signined");
                }else{
                    sign.createNewUser(req.body.name,req.body.password)
                        .then(()=>{
                            req.session.log=true;
                            req.session.name=req.body.name;
                            res.send("注册成功");
                            res.redirect(user);
                        }).catch(err=>{
                        res.send("false");
                    })
                }
            })
    }else {
        res.redirect("user");
    }
});
module.exports = router;
