import express from 'express';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';
import { walletControler } from './wallet.controller';



const router = express.Router();

router.get('/',checkAuth(...Object.values(Role)),walletControler.getWallets);
router.get('/me',checkAuth(...Object.values(Role)),walletControler.getWallet);

router.post('/:Id',checkAuth(...Object.values(Role.USER)) ,walletControler.addedMoney );
router.post('/withdraw/:Id',checkAuth(...Object.values(Role.USER)) ,walletControler.withdrawMoney );
router.post('/send/:senderId',checkAuth(...Object.values(Role.USER)) ,walletControler.sendMoney );
router.patch("/block/:walletId",checkAuth(...Object.values(Role.ADMIN)) ,walletControler.setBlockWallet );
router.patch("/unblock/:walletId",checkAuth(...Object.values(Role.ADMIN)) ,walletControler.setUnBlockWallet );

export const WalletRouer =  router;