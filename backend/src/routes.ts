// routes.ts

import express from 'express';
import { authMiddleware } from './middleware';
import {
  healthCheck,
  handleSignIn,
  handleSignUp,
  requestForLoan,
  getAllLoans
} from './controller';

const router = express.Router();


router.get('/health', healthCheck);
router.post('/signup', handleSignUp);
router.post('/signin', handleSignIn);

// Protected routes
router.post('/request-loan', authMiddleware, requestForLoan);
router.get('/loans', authMiddleware, getAllLoans);

export default router;