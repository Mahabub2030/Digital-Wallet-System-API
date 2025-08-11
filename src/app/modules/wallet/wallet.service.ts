import { Request } from "express"
import { Wallet } from "./wallet.model"
import { sendResponse } from "../../../utils/sendResponse"

import  httpStatusCode  from "http-status-codes"
import { Transaction } from "../transaction/transaction.interface"

const getTransactionId =()=>{
    return  `tran_${Date.now()}_${Math.floor(Math.random()*1000)}`
}
const trnasactionId = getTransactionId()


const getWallet = async()=>{
    
    

    return {}
}

const updateWallet = async()=>{

    return{}
}

const addedMoney =async (req :Request,res:Response)=>{

    const user:any =(req as any).user
    const  {amount} = req.body
    if(amount <= 0) return res.status(400).json({message:"Amount must be postive"})
    
        const session = await Wallet.startSession()


    try {
        session.startTransaction()
        const wallet = await Wallet.findOne({userId:user._id}).session(session)
        if(!wallet)throw new Error("Wallet not Found")
            if(wallet.isBlocked) throw new Error("Wallet is Bloked")

                wallet.balance += amount;
                await wallet.save({session})

                await Transaction.create([
                    {
                        type:'deposit',
                        amount,
                        initiaedBy:user._id,
                        status:'success'
                    }
                ],{session})
                await session.commitTransaction()
                res.json({balance:wallet.balance })
        
    } catch (error) {
        await session.abortTransaction()
       console.log(error)
    } finally{
        session.endSession();
    }
 
}

const WithdrawMony = async()=>{
    return {}
}

const sendMony =async()=>{

}
// for admin
const setBlockWallet = async()=>{
    return {}
}

const unblockWallet = async()=>{
    return {}
}

// for aggent
const CashInMony = async()=>{
    return{}
}
const CashOutMony = async()=>{
    return{}
}


export const WalletService ={
    addedMoney
}