import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as config from './config';
import {token} from "./Helpers/auth";
import route from "./Api/routes";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.static(__dirname + '/Media'));

app.use('/api/patient/log', token);
app.use('/api/admin/log', token);
app.use('/api', route);

app.listen(port, () => {
    console.log(`Server started with port ${port}`);
})