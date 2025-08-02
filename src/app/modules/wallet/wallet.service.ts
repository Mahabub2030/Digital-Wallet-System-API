
import { Types } from "mongoose";
import { Wallet } from "./wallet.model";


  export const getWalletByUserId = async( userId:Types.ObjectId)=>{
  return Wallet.findOne({userId})
}


export const WallerServices = {
  getWalletByUserId

}