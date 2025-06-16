import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User} from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const {firstName, lastname, email, phone, password, gender, dob, nic, role} = req.body;
    if(!firstName || !lastname || !email || !phone || !password || !gender || !dob || !nic || !role) {
        return next(new ErrorHandler("Please Fill Full Form", 400));
    }
    let user = await User.findOne({email});
    if(user) {
        return next(new ErrorHandler("User Already Exists", 400));
    }
    user = await User.create({
        firstName,
        lastname,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role,   
    });
     generateToken(user, "user Registered!", 200, res);
    
});

export const login = catchAsyncErrors(async (req, res, next) => { 
    const {email, password, confirmPassword, role} = req.body;
    if(!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please provide All Details", 400));
    }
    if(password !== confirmPassword) {
        return next(new ErrorHandler("Password and Confirm Password do not match", 400));
    }
    const user = await User.findOne({email}).select("+password");
    if(!user) {
        return next(new ErrorHandler("Invalid Password Or email", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Password Or email", 400));
    }
    if(role !== user.role) {
        return next(new ErrorHandler("User with this role not found", 400));
    }
     generateToken(user, "User Login successfully!", 200, res);
    
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastname,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
    } = req.body;
    if(
        !firstName || 
        !lastname || 
        !email || 
        !phone || 
        !password ||
        ! gender ||
        !dob ||
        !nic
    ) {
        return next(new ErrorHandler("Please Fill Full Form", 400));
    }
    const isRegistered = await User.findOne({email});
    if(isRegistered) {
        return next(new ErrorHandler("Admin with this email Already exists"));
    }
    const admin = await User.create({
        firstName,
        lastname,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role: "admin",
});
    res.status(200).json({
        success: true,
        message: "Admin Created Successfully",
    });
});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
      const doctors = await User.find({role: "doctor"});
        res.status(200).json({
        success: true,
        doctors,
        });
   });

   export const getUsersDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("adminToken", "", {

        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: "Admin Logged Out Successfully",
    });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("patientToken", "", {

        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: "user Logged Out Successfully",
    });
});

