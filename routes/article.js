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
});
router.get("/desc/:num",function (req,res,next) {
    console.log(req.params.num);
    if(req.session.log=='true'){
        console.log("get");
        let id=req.params.num;
        let comments;
        art.findArticleComment(id)
            .then(rows=>{
                comments=rows;
                res.send(comments);
            }).catch(err=>{
                console.log(err);
        })
    }else{
        res.redirect('../error');
    }
});
router.get("/delete/:num",function(req,res,next){
    let id=req.params.num;
    if(req.session.log=='true'){
        console.log("get an article delete requestion");
        art.deleteArticle(id)
            .then(rows=>{
                console.log(rows);
                res.redirect('../../article');
            }).catch(err=>{
                console.log(err);
         })
    }else{
        res.send("您无权进行操作");
    }
});
module.exports=router;