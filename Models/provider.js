import { Schema, model } from 'mongoose';

const providerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    select_title: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const providerModel = model('provider', providerSchema);

export default providerModel;