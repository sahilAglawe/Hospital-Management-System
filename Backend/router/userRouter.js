import express from 'express';
import { login } from '../controller/userController';

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/login", login);

export default router;