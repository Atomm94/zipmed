import { Router } from 'express';
import patient from "./Patient/router";
import provider from "./Provider/router";
import {login} from "./general";
import admin from "./Admin/router";
const route = Router();

route.use('/patient', patient);
route.use('/provider', provider);
route.use('/admin', admin);
route.use('/login', login);

export default route;