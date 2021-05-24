import {errorHandler, successHandler} from "../../Helpers/responseFunctions";
import {hashPassword} from "../../Helpers/passwordHash";
import patientModel from "../../Models/patient";
import jsonwebtoken from 'jsonwebtoken';
import * as config from '../../config';
import { stripe } from "../../config";
import {error} from "../../Helpers/constant";

const register = async (req, res) => {
    try {
        const body = req.body;
        body.password = await hashPassword(body.password);
        const createPatient = await patientModel.create(body);
        res.message = 'Patient is register successfully!';
        return successHandler(res, createPatient);
    } catch (err) {
        return errorHandler(res, err);
    }
}

const addCard = async (req, res) => {
    try {
        const token = req.authorization || req.headers['authorization'];
        const decodeToken = await jsonwebtoken.decode(token);
        const findPatient = await patientModel.findOne({_id: decodeToken.data.id});
        if (!findPatient) {
            error.message = "Patient is not find!";
            return errorHandler(res, error);
        }
        const {
            cardNumber,
            cardExpMonth,
            cardExpYear,
            cardCVC,
            postal_code
        } = req.body;

        const customer = await  stripe.customers.create(
            {
                email: findPatient.email,
            }
        )
        if (!cardNumber || !cardExpMonth || !cardExpYear || !cardCVC) {
            return res.status(400).send({
                Error: 'Please Provide All Necessary Details to save the card'
            })
        }

        const cardToken = await stripe.tokens.create({
            card: {
                number: cardNumber,
                exp_month: cardExpMonth,
                exp_year: cardExpYear,
                cvc: cardCVC,
                address_zip: postal_code
            }
        })
        const card = await stripe.customers.createSource(customer.id, {
            source: `${cardToken.id}`
        })
        await patientModel.updateOne({_id: decodeToken.data.id}, {
            $set: {cardId: card.id, customerId: customer.id}
        })
        return successHandler(res, card);
    } catch (err) {
        return errorHandler(res, err);
    }
}

export {
    register,
    addCard
}