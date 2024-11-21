import { StudentModel } from '../student.model';
import { StudentType } from './student.interface';

const createStudentIntoDB = async (student: StudentType) => {
  //
  const result = await StudentModel.create(student);

  return result;
};

const getAllStudentFromDB = async () => {
  const result = await StudentModel.find();

  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id });

  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
