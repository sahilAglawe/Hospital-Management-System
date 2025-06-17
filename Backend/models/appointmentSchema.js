import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
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
    nic: {
        type: String,
        required: true,
        minLength: [5, "NIC must contain exact 5 digits!"],
        maxLength: [5, "NIC must contain exact 5 digits!"],
    },
    dob: {
        type: Date,
        required: [true, "DOB is required!"],
    },
    gender : {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    
   appointment_date:{
    type: String,
    required: true,
   },
   department: {
    type: String,
    required: true,
   },
    doctor: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    hasVisited: {
        type: Boolean,
        required: true,
    },
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected" ],
        default: "Pending",
    },
    });

    export const Appointment = mongoose.model("Appointment", appointmentSchema);
    