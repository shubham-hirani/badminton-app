const express = require('express')
const User = require('../schema/userSchema')
const router = express.Router()
const conn = require('./../db/mysql')

router.post('/create/user', async(req,res)=>{
    let isUserExist = conn.execute("SELECT * from `user_details` where `email` = ?", [req.body.email], (err, result) => {
        if (err){
            throw err
        }
        if(result.length>0){
            return true
        }
    })
    if(isUserExist){
        return res.status(409).send({ "message": "user already exist"});
    }
    const user = User.userSchema.validate(req.body)
    
    try{
        conn.execute("INSERT INTO `badminton`.`user_details`(`firstName`,`lastName`,`email`,`type`,`age`,`gender`,`password`) VALUES = (?, ?, ?, ?, ?, ?, ?);", [req.body.firstName, req.body.lastName, req.body.email, req.body.type, req.body.age, req.body.gender, req.body.password], (err, result) => {
            if (err){
                throw err
            }
        })
        const token = User.generateAuthToken(user.value.email)
        return res.status(201).send({"user": user.value, token})
    }catch(err){
        return res.status(400).send(err)
    }
})
router.post('/login', async(req,res)=>{
    try{
        const user= conn.query(`SELECT * from user_details where email = ${conn.escape(req.body.email)};`, (err, data) => {
            if (err){
                return res.send(err)
            }
            if (data.length > 0){
                if(req.body.password === data[0]["password"]){
                    let token = User.generateAuthToken(req.body.email)
                    return res.status(200).send({"Ok": true, token})
                }
                else {
                    return res.status(403).send({"message": "Either username or password is incorrect"})
                }
            }
            else {
                return res.status(403).send({"message": "No User found"})
            }
        })
    }
    catch(err){
        res.status(400).send(err)
        
    }
})

module.exports= router