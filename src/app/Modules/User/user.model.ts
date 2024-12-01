import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

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

userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save our data');

  // hasing password and save intoDb

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // this means currently processing data // this user refers to "doc"

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// set empty string after saving password
userSchema.post('save', function (doc, next) {
  // after the getting the updated Data I mean hashed password we wil hide it from DB By Empty String

  doc.password = '';
  next();
});

// Create the model from the schema
export const UserModel = model<TUser>('User', userSchema);
