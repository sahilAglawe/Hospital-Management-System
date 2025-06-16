import express from 'express';
import { login, addNewAdmin, patientRegister, getAllDoctors, getUsersDetails, logoutAdmin } from '../controller/userController';
import { isAdminAuthenticated, isPatientAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew",isAdminAuthenticated ,addNewAdmin);
router.get("/doctors ", getAllDoctors);
router.get("/admin/me", isAdminAuthenticated, getUsersDetails);
router.get("/patient/me", isPatientAuthenticated, getUsersDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);

export default router;