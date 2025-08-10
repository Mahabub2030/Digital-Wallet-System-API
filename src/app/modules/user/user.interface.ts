import { Types } from "mongoose";

export enum Role {
  SUPAR_ADMIN = "SUPAR_ADMIN",
  ADMIN = "ADMIN",
  AGENT = "AGENT",
  USER = "USER",
}
export enum IsActive {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  BLOCKED = "BLOCKED",
}

export interface IAuthProvider {
  provider: string;
  providerId: string;
}

export interface IUser {
  userId?:Types.ObjectId
  name: string;
  email: string;
  password: string;
  wallet:string;
  role: Role;
  auths: IAuthProvider[];
  isApproved?: boolean;
  IsActive?: IsActive;
  createdAt: Date;
}
