

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


export interface  IAuthProvider{
    provider :string
    providerId:string
}


export interface IUser {
  name: string;
  email: string;
  password: string;
  phone?: string;
  picture?: string;
  role: Role;
  auths:IAuthProvider[]
  isApproved?: boolean;
  isDeteted?: string;
  IsActive?:IsActive
}
