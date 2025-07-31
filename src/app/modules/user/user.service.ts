import { QueryBuilder } from "../../../utils/QueryBuilder";
import { IUser } from "./user.interface";
import { User } from "./user.model";



const createUser = async(paylode:Partial<IUser>)=>{
    const {email, password} = paylode;

const isUserExit = await User.findOne({email})

// if(isUserExit){
//     throw new Error("User Already Exit")
// }


    const user = await  User.create({
        email,
        password
    })
    return user

}

const getAllUsers = async (query: Record<string, string>) => {

    const queryBuilder = new QueryBuilder(User.find(), query)
    const usersData = queryBuilder
        .filter()
        .sort()
        .fields()
        .paginate();

    const [data, meta] = await Promise.all([
        usersData.build(),
        queryBuilder.getMeta()
    ])

    return {
        data,
        meta
    }
};


export const UserService = {
    createUser,
    getAllUsers
}