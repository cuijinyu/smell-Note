let mysql=require("../db/db");
let _=require("underscore");
let moment=require("moment");
module.exports={
    createNewArticle:function(title,author,message){
        let date=moment().format("YYYY-MM-DD hh:mm:ss");
        return new Promise((resolve,reject)=>{
            mysql.query(`insert into article (title,author,text,time) values('${title}','${author}','${message}','${date}')`)
                .then((rows)=>{
                    console.log(rows);
                    resolve(rows);
                }).catch((err)=>{
                    console.log(err);
                    reject(err);
                 })
        })
    },
    findAllArticle:function(){
        return new Promise((resolve,reject)=>{
            mysql.query('select * from article')
                .then((rows)=>{
                    resolve(rows);
                }).catch((err)=>{
                console.log(err);
                reject(err);
            })
        })
        },
    findUserArticle:function(user){
        return new Promise((resolve,reject)=>{
            mysql.query(`select * from article where user='${user}'`)
                .then(rows=>{
                    resolve(rows);
                }).catch(err=>{
                    console.log(err);
                    reject(err);
                })
        })
    },
    findArticleComment:function(id){
        return new Promise((resolve,reject)=>{
            mysql.query(`select article.title,comment.message from article inner join comment where article.article_id=${id} and article.article_id=comment.articleid`)
                .then(rows=>{
                    resolve(rows);
                }).catch(err=>{
                    console.log(err);
                    reject(err);
                })
        })
    },
    deleteArticle:function(id){
        return new Promise((resolve,reject)=>{
            mysql.query(`delete from article where article_id=${id}`)
                .then(rows=>{
                    console.log(rows);
                    resolve(rows);
                }).catch(err=>{
                    console.log(err);
                    reject(err);
                })
        })
    },
    deleteComment:function(id){
        mysql.query(`delete from comment where id='${id}'`)
            .then(rows=>{
                resolve(rows)
            }).catch(err=>{
                console.log(err);
                reject(err);
            })
    },
    addComment:function(message,articleid){
        let date=moment().format("YYYY-MM-DD hh:mm:ss");
        return new Promise((resolve,reject)=>{
            mysql.query(`insert into comment (time,username,message,articleid) value('${date}','${req.session.name}','${message}','${articleid}')`)
                .then(rows=>{
                    resolve(rows);
                }).catch(err=>{
                    console.log(err);
                    reject(err);
            })
        })
    }
}
