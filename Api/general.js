import {errorHandler, successHandler} from "../Helpers/responseFunctions";
import patientModel from "../Models/patient";
import {error} from "../Helpers/constant";
import providerModel from "../Models/provider";
import {comparePassword} from "../Helpers/passwordHash";
import {createJwtToken} from "../Helpers/auth";
import superAdminModel from "../Models/superAdmin";

const login = async (req, res) => {
    try {
        let findPersonWithEmail, tok, respObj;
        const { email, password } = req.body;
        findPersonWithEmail = await patientModel.findOne({email: email});
        if (!findPersonWithEmail) {
            findPersonWithEmail = await providerModel.findOne({email: email});
            if (!findPersonWithEmail) {
                findPersonWithEmail = await superAdminModel.findOne({email: email});
                if (!findPersonWithEmail) {
                    error.message = 'patient/provider/superAdmin with this email is not find!';
                    return errorHandler(res, error);
                }
            }
        }
        const compare = await comparePassword(password, findPersonWithEmail.password);
        if (!compare) {
            error.message = 'Password is not correct!';
            return errorHandler(res, error);
        }
        tok = {
            id: findPersonWithEmail._id
        }
        const token = await createJwtToken(tok);
        respObj = {
            Data: findPersonWithEmail,
            Token: token
        }
        res.message = 'You are login successfully!';
        return successHandler(res, respObj);
    } catch (err) {
        return errorHandler(res, err);
    }
}

export {
    login
}