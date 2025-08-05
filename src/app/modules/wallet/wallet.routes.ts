

import express from 'express';

import { walletControler,  } from './wallet.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';




const router = express.Router();

router.get('/me',checkAuth(...Object.values(Role)),walletControler.getMyWallet);
router.patch('/:id',checkAuth(...Object.values(Role.ADMIN)) ,walletControler.toggleWalletBlock );

export const WalletRouer =  router;