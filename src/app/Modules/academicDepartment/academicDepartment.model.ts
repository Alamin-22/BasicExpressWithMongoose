import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: { type: String, required: true, unique: true },
    academicFaculty: { type: Schema.Types.ObjectId, ref: 'AcademicFaculty' },
  },
  { timestamps: true },
);
// validation
academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await academicDepartmentModel.findOne({
    name: this.name,
  });

  if (isDepartmentExist) {
    throw new Error('This Department Is Already Exist');
  }
  next();
});
// validation
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isDepartmentExist = await academicDepartmentModel.findOne(query);

  if (!isDepartmentExist) {
    throw new Error('This Department Does Not Exist');
  }
  next();
});

export const academicDepartmentModel = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
