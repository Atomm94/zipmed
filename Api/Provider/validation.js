import Joi from 'joi';
const validator = require('express-joi-validation').createValidator({})

const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required(),
    select_title: Joi.string().required(),
    password: Joi.string().min(3).required()
})

const registerValidation = validator.body(registerSchema);

export {
    registerValidation
}