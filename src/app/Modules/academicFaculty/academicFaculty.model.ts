import { model, Schema } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>({
  name: { type: String, required: true, unique: true },
});

export const academicFacultyModel = model<TAcademicFaculty>(
  'academicFaculty',
  academicFacultySchema,
);
