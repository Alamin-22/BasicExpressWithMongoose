import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudentType,
  TUserName,
} from './Students/student.interface';

import bcrypt from 'bcrypt';
import config from '../config';

// 2. Create a Schema corresponding to the document interface.

const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is Required'],
    trim: true, // => trim is used to remove unwanted space before and after
    maxlength: [20, 'First Name Can not be more than 20 characters'],
    // custom validation
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);

        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalized format',
    },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last Name is Required'],
    // using validator External Validator
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const GuardianSchema = new Schema<TGuardian>({
  fathersName: {
    type: String,
    required: [true, 'fathers  Name is Required'],
  },
  fathersContactNo: {
    type: String,
    required: [true, 'fathers contact Number is Required'],
  },
  fathersOccupation: {
    type: String,
    required: [true, 'fathers Occupation is Required'],
  },
  mothersName: {
    type: String,
    required: [true, 'Mothers Name is Required'],
  },
  mothersContact: {
    type: String,
    required: [true, 'Mothers contact Number is Required'],
  },
  mothersOccupation: {
    type: String,
    required: [true, 'Mothers Occupation is Required'],
  },
});
const LocalGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'For Local Guardian Name is Required'],
  },
  occupation: {
    type: String,
    required: [true, 'For Local Guardian Occupation is Required'],
  },
  contactNo: {
    type: String,
    required: [true, 'For Local Guardians Number is Required'],
  },
  address: {
    type: String,
    required: [true, 'For Local Guardian Address is Required'],
  },
});

const StudentSchema = new Schema<TStudentType, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    name: {
      type: UserNameSchema,
      required: true,
    },

    //   this is called Enum type in Mongoose => this is only used for predefined property that will never gonna change
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message:
          "The Gender field can only be the following: 'male', or 'female' ",
      },
      required: true,
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: '{VALUE} => is not valid',
      },
    },
    password: {
      type: String,
      required: [true, 'password is Required'],
      maxlength: [20, 'password can not be more than 20 characters'],
    },
    contactNumber: { type: String, required: true },
    emergencyContactNumber: { type: String, required: true },

    // again we are using Enum Because Blood Group is already for all time Predefined
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      type: GuardianSchema,
      required: true,
    },
    localGuardian: {
      type: LocalGuardianSchema,
      required: true,
    },
    profileImg: { type: String },
    // enum
    isActive: {
      type: String,
      enum: ['active', 'blocked'],
      // default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true, /// Enabling  virtuals to use on the Client
    },
  },
);

// virtual field which is not exist on the real DB but can be shown on the Interface I mean Client
StudentSchema.virtual('fullname').get(function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; ///this is refers to the full targeted Doc
  return `${user.name.firstName}  ${user.name.middleName}  ${user.name.lastName}`; /// after this we have to enable virtual to show on use on the client
});

// 3. Create a Model.
// const User = model<IUser>('User', userSchema);

// creating a custom static method

StudentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

// creating a custom instance method
// StudentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });

//   return existingUser;
// };

//  mongoose Pre Save Middleware  / Hook and it will work on crate func or save method

//  we have to keep in mind that thse pre and most or others stuff will only work before schema export

StudentSchema.pre('save', async function (next) {
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

// post save middleware /hook

StudentSchema.post('save', function (doc, next) {
  // after the getting the updated Data I mean hashed password we wil hide it from DB By Empty String

  // console.log(this, 'Post hook: we saved our data');

  doc.password = '';
  next();
});

// query Middleware or query Hook

StudentSchema.pre('find', function (next) {
  /// making sure that only valid data is passed and deleted data is filtered out
  this.find({ isDeleted: { $ne: true } });
  next();
});
StudentSchema.pre('findOne', function (next) {
  /// making sure that only valid data is passed and deleted data is filtered out
  this.find({ isDeleted: { $ne: true } });
  next();
});

StudentSchema.pre('aggregate', function (next) {
  /// making sure that only valid data is passed and deleted data is filtered out
  // this.find({ isDeleted: { $ne: true } });

  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Student = model<TStudentType, StudentModel>(
  'Student',
  StudentSchema,
);
