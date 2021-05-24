import Joi from 'joi';
const validator = require('express-joi-validation').createValidator({})

const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    birthDay: Joi.string().regex(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/),
    phone: Joi.string().required(),
    email: Joi.string().email().regex(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).required(),
    password: Joi.string().min(3).required()
})

const addCardSchema = Joi.object({
    cardNumber: Joi.string().required(),
    cardExpMonth: Joi.string().required(),
    cardExpYear: Joi.string().required(),
    cardCVC: Joi.number().required(),
    postal_code: Joi.string()
})

const registerValidation = validator.body(registerSchema);
const addCardValidation = validator.body(addCardSchema);

export {
    registerValidation,
    addCardValidation
}