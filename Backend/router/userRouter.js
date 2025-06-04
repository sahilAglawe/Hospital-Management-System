import express from 'express';
import { login, addNewAdmin, patientRegister } from '../controller/userController';

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);
router.post("/admin/addnew", addNewAdmin);

export default router;