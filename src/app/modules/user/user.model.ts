import bcrypt from "bcrypt";
import { model, Schema, Document } from "mongoose";

export enum Role {
  ADMIN = "admin",
  USER = "user",
  AGENT = "agent",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Role;
  status: "ACTIVE" | "BLOCKED" | "SUSPENDED";  // Use consistent casing as in schema
  commissionRate?: number;
  approved?: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Extend Document with IUser properties and methods
export interface IUserDocument extends IUser, Document { }

const UserSchema = new Schema<IUserDocument>({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(Role), default: Role.USER },
  status: { type: String, enum: ["ACTIVE", "BLOCKED", "SUSPENDED"], default: "ACTIVE" },
  commissionRate: { type: Number, default: 0 },
  approved: { type: Boolean, default: false }, // for agents
}, { timestamps: true, versionKey: false });

// Hash password before save
UserSchema.pre<IUserDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUserDocument>("User", UserSchema);
