import { model, Schema } from "mongoose";
import { IAuthProvider, IsActive, Role } from "./user.interface";

const authProviderSchema = new Schema<IAuthProvider>(
  {
    provider: { type: String, required: true },
    providerId: { type: String, required: true },
  },
  { versionKey: false, _id: false }
);

const userSchema = new Schema(
  {
    name: { type: String, },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: Number },
    role: { type: String, enum: Object.values(Role), default: Role.USER },
    picture: { type: String },
    isDeteted: { type: Boolean, default: false },
    IsActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE,
    },
    isApproved: { type: Boolean, default: false },
    auths: [authProviderSchema],
  },
  { timestamps: true, versionKey: false }
);

export const User = model("User", userSchema);
