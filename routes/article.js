let express = require('express');
let art=require('../controller/article');
let router = express.Router();

router.get("/",function (req,res,next) {
    console.log(req.session.log);
    console.log(req.session.name);
    if(req.session.log=='true'){
        art.findAllArticle()
            .then((rows)=>{
                    console.log(rows);
                    res.render('article',{username:req.session.name,message:rows});
            }).catch((err)=>{
                console.log(err)
            })
    }else{
        art.findAllArticle()
            .then((rows)=>{
                console.log(rows);
                res.render('article',{username:"没有登录",message:rows});
            }).catch((err)=>{
            console.log(err)
        })
    }
});
router.get("/userarticle",function (req,res,next) {
   if(req.session.log=='true'){
       let message;
       art.findUserArticle(req.session.name)
           .then(rows=>{
               message=rows;
           })
       res.render('personarticle',{rows:message});
   }else{
       res.send("抱歉您还没有登录");
   }
});
router.get("/newarticle",function (req,res,next) {
    if(req.session.log=='true'){
        res.render('newarticle');
    }else{
        res.send("您还没有登录，请先登录")
    }
});
router.post("/newarticle",function (req,res,next) {
    if(req.session.log=='true'){
        let author=req.body.author;
        let title=req.body.title;
        let message=req.body.message;
        art.createNewArticle(title,author,message)
            .then(rows=>{
                console.log("成功发表文章");
                res.redirect('../article');
            }).catch(err=>{
                console.log(err);
                res.send("error");
        })
    }else{
        res.send("error");
    }
})
module.exports=router;