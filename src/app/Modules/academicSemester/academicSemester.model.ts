import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.consts';

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
      type: String,
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

academicSemesterSchema.pre('save', async function (next) {
  // checking the created semester in the current year
  const isSemesterExist = await AcademicSemesterModel.findOne({
    year: this.year,
    name: this.name,
  });

  if (isSemesterExist) {
    throw new Error('Semester Is Already Exist');
  }

  next();
});

// Create the model from the schema
export const AcademicSemesterModel = model<TAcademicSemester>(
  'academicSemester',
  academicSemesterSchema,
);
