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
    password: { type: String , required:true},
    role: { type: String, enum: Object.values(Role), default: Role.USER },
    picture: { type: String },
         isAgentApproved: { type: Boolean, default: false },
    IsActive: {
      type: String,
      enum: Object.values(IsActive),
      default: IsActive.ACTIVE,
    },
    wallet: { type: Schema.Types.ObjectId, ref: 'Wallet' },
    auths: [authProviderSchema],
  },
  { timestamps: true, versionKey: false }
);

export const User = model("User", userSchema);
