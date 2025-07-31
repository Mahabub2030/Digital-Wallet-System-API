import express from 'express';
import { AuthControllers } from './auth.controller';
const router = express.Router();



router.post('/login',AuthControllers.credentialsLogin );

export const AuthRoutes = router;