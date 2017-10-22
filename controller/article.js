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
    }
}
