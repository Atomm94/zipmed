import {errorHandler, successHandler} from "../../Helpers/responseFunctions";
import {hashPassword} from "../../Helpers/passwordHash";
import providerModel from "../../Models/provider";

const register = async (req, res) => {
    try {
        const body = req.body;
        body.password = hashPassword(body.password);
        const createProvider = await providerModel.create(body);
        res.message = 'Provider is registered successfully!';
        return successHandler(res, createProvider);
    } catch (err) {
        return errorHandler(res, err);
    }
}

export {
    register
}