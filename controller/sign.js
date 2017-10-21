let mysql=require("../db/db");
module.exports={
    createNewUser: function(name,password) {
        return new Promise((resolve,reject)=>{
            mysql.query(`insert  into user (name,password) values('${name}','${password}')`)
                .then((rows)=>{
                    console.log(rows);
                    resolve(rows);
                }).catch((err)=>{
                    console.log(err);
                    reject(err);
            })
        })
    },
    findUser: function(userName) {
        return new Promise((resolve,reject)=>{
            mysql.query(`select * from user where name='${userName}'`)
                .then((rows)=>{
                    console.log(rows);
                    resolve(rows);
                }).catch(err=>{
                    console.log(err);
                    reject(err);
                })
        })
     },
    findAllUser:function(){
        return new Promise((resolve,reject)=>{
            mysql.query(`select * from user`)
                .then(function (rows) {
                    console.log(rows);
                    resolve(rows);
                }).catch(err=>{
                    console.log(err);
                    reject(err);
                 })
        });
    },
    checkPassword:function(obj,target){
            console.log("obj:"+obj.name+","+obj.password);
            console.log("target:"+target[0].name+","+target[0].password);
            if(obj.name==target[0].name&&obj.password==target[0].password){
                return true;
            }else{
                return false;
            }
    }
};


