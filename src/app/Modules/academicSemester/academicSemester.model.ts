import { model, Schema } from 'mongoose';
import {
  TAcademicSemester,
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TMonths,
} from './academicSemester.interface';

const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const AcademicSemesterName: TAcademicSemesterName[] = [
  'Autumn',
  'Summer',
  'Fall',
];

const AcademicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesterName,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemesterCode,
      required: true,
    },
    year: {
      type: Date,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },

  {
    timestamps: true,
  },
);

// academicSemesterSchema.pre('save', async function (next) {
//   // console.log(this, 'pre hook : we will save our data');

//   // hasing password and save intoDb

//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this; // this means currently processing data // this user refers to "doc"

//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds),
//   );

//   next();
// });

// // set empty string after saving password
// academicSemesterSchema.post('save', function (doc, next) {
//   // after the getting the updated Data I mean hashed password we wil hide it from DB By Empty String

//   doc.password = '';
//   next();
// });

// Create the model from the schema
export const AcademicSemesterModel = model<TAcademicSemester>(
  'academicSemester',
  academicSemesterSchema,
);
