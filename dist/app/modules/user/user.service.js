"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const QueryBuilder_1 = require("../../../utils/QueryBuilder");
const user_model_1 = require("./user.model");
const createUser = async (paylode) => {
    const { email, password } = paylode;
    const isUserExit = await user_model_1.User.findOne({ email });
    if (isUserExit) {
        throw new Error("User Already Exit");
    }
    const user = await user_model_1.User.create({
        email,
        password
    });
    return user;
};
const getAllUsers = async (query) => {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(user_model_1.User.find(), query);
    const usersData = queryBuilder
        .filter()
        .sort()
        .fields()
        .paginate();
    const [data, meta] = await Promise.all([
        usersData.build(),
        queryBuilder.getMeta()
    ]);
    return {
        data,
        meta
    };
};
exports.UserService = {
    createUser,
    getAllUsers
};
