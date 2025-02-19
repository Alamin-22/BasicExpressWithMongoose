import { model, Schema } from 'mongoose';
import { TUser, TUserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { USER_STATUS } from './user.constant';

const userSchema = new Schema<TUser, TUserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0, // hide password from query result
    },

    passwordChangedAt: {
      type: Date,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty', 'supper_admin'], // Use enum for strict type adherence
      required: true,
    },
    status: {
      type: String,
      enum: USER_STATUS, // Use enum to enforce allowed values
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

userSchema.statics.isUserExistByCustomId = async function (id: string) {
  return await UserModel.findOne({ id }).select('+password');
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = async function (
  JwtIssuedTimeStamp: number,
  passwordChangedTimeStamp: Date,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimeStamp).getTime() / 1000;

  return passwordChangedTime > JwtIssuedTimeStamp;
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// Create the model from the schema
export const UserModel = model<TUser, TUserModel>('User', userSchema);
