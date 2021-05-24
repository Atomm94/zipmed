import express from 'express';
const provider = express();
import * as controllers from './index';
import * as validation from './validation';

provider.post('/register', validation.registerValidation, controllers.register);

export default provider;