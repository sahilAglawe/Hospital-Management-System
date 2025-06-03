import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First name must be at least 3 characters!"],
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last name must be at least 3 characters!"],
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please enter a valid email address!"],
    },
    phone: {
        type: String,
        required: true,
        minLength: [11, "phone number must contain exact 11 digits!"],
        maxLength: [11, "phone number must contain exact 11 digits!"],
    },
    message: {
        type: String,
        required: true,
        minLength: [10, "message must contain exact 10 characters!"],
    },

    });

    export const Message = mongoose.model("Message", messageSchema);