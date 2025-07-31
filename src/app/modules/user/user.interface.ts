import { Types } from "mongoose";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  AGENT = "AGENT",
}

export interface IAuthProvider {
  provider: "google" | "credentials"; // "Google", "Credential"
  providerId: string;
}

export enum IsActive {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  BLOCKED = "BLOCKED",
}

export interface IUser {
   _id?: Types.ObjectId
   name: string;
  email: string;
  password: string;
   isDeleted?: string;
    isActive?: IsActive;
    isVerified?: boolean;
  role: Role;
  status: "ACTIVE" | "BLOCKED" | "SUSPENDED";
  commissionRate?: number;
  approved?: boolean;
}
