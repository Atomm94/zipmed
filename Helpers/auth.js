import express from'express';
import jwt from'jsonwebtoken';
import config from '../config';
import {successHandler, errorHandler} from "./responseFunctions";
import {error} from "./constant";
const token = express();

token.use('/', async (req, res, next) => {
    const jwtAuth = req.authorization || req.headers['authorization'];
    jwt.verify(jwtAuth, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return errorHandler(res, err);
        }
        next()
    })
})

const createJwtToken = async (data) => {
    const getToken = await jwt.sign({data: data}, process.env.JWT_SECRET_KEY);
    return getToken;
}


export {
    token,
    createJwtToken
}
