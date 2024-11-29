import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'], // Use enum for strict type adherence
      required: true,
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'], // Use enum to enforce allowed values
      default: 'in-progress', // Provide a default value
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Create the model from the schema
export const UserModel = model<TUser>('User', userSchema);
