let mysql=require("../db/db");
let _=require("underscore");
module.exports={
    createNewArticle:function(title,author,message){
        return new Promise((resolve,reject)=>{
            mysql.query(`insert into article (title,author,message) values('${title}','${author}','${message}')`)
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
        mysql.query('find * from article')
            .then((rows)=>{

            })
    }
}