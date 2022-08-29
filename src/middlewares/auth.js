let constants = require('./../common/constant')
const conn = require("./../db/mysql")
const jwt = require('jsonwebtoken')

const auth = (req,res, next) => {
    try{
        
        if(req.headers.authorization==null){
        res.status(404).json({ 
            "status":"fail",
            "message":"first login for acees"
        })
    }
    else if(req.headers.authorization.startsWith("Bearer "))
            {
                let token = req.headers.authorization.split(' ')[1]
                const decoded  = jwt.verify(token, constants.JWT_SECRET)
                let isUserExist = conn.query(`SELECT * from user_details where email= ${conn.escape(decoded._id)}`, (err, data) => {
                    if(err){
                        return err
                    }
                    if(data.length>0){
                        return true
                    } else{
                        return false
                    }
                })
                if(!isUserExist){
                        throw new Error('please login')
                    }
                req.token = token
                next()
                }
            }catch(err){
                res.status(400).send({error : 'please authenticate'})
            }
}

module.exports = auth