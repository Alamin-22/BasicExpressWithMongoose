import { StudentModel } from '../student.model';
import { StudentType } from './student.interface';

const createStudentIntoDB = async (student: StudentType) => {
  //
  const result = await StudentModel.create(student);

  return result;
};

export const StudentServices = {
  createStudentIntoDB,
};
