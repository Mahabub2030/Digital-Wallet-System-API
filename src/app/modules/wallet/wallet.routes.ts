

import express from 'express';

import { getMyWallet, walletControler,  } from './wallet.controller';
import { authorize } from 'passport';



const router = express.Router();

router.get('/me', getMyWallet);
router.patch('/block/:id', walletControler.toggleWalletBlock );

export const WalletRouer =  router;