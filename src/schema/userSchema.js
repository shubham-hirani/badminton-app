const Joi = require('joi')
const constants = require('./../common/constant')
const jwt = require("jsonwebtoken")

const userSchema = new Joi.object({
    firstName: Joi.string()
            .min(5)
            .max(50)
            .required(),
    lastName: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().required(),
    type: Joi.string().valid(constants.COACH, constants.PLAYER).required(),
    age: Joi.number().integer().max(50).required(),
    gender: Joi.string().valid(constants.MALE, constants.FEMALE).required(),
    password: Joi.string().min(6).max(20).required()
})


const generateAuthToken = (email) => {
    const token = jwt.sign({ _id : email.toString()}, constants.JWT_SECRET)
    return token
}

module.exports = { userSchema, generateAuthToken }