import express from 'express';
const patient = express();
import * as controllers from './index';
import * as validation from './validation';

patient.post('/register', validation.registerValidation, controllers.register);
patient.post('/log/addCard', validation.addCardValidation, controllers.addCard);

export default patient;