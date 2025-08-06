
import { Types } from "mongoose";
import { Wallet } from "./wallet.model";


 const getWalletByUserId = async ( userId:Types.ObjectId)=>{
    return await Wallet.findOne({ user: userId });
}


export const toggleWalletBlockService = async (userId: string) => {
  // Find wallet by user ID (not wallet _id)
  const wallet = await Wallet.findOne({ user: userId });

  if (!wallet) {
    throw new Error('Wallet not found');
  }

  // Toggle the block status
  wallet.blocked = !wallet.blocked;

  // Save the updated wallet
  await wallet.save();

  return wallet;
};


export const WallerServices = {
  getWalletByUserId

}