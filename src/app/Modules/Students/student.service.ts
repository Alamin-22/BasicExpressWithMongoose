import { Student } from '../student.model';
import { TStudentType } from './student.interface';

const createStudentIntoDB = async (studentData: TStudentType) => {
  if (await Student.isUserExists(studentData.id)) {
    throw Error('User Already exists');
  }
  //
  const result = await Student.create(studentData); /// => this is called Built in Static Method

  // const student = new Student(studentData); /// => create an instance

  // if (await student.isUserExists(studentData.id)) {
  //   throw Error('User Already exists');
  // }

  // const result = await student.save(); // => this is called Built in instance method provided by mongoose

  return result;
};

const getAllStudentFromDB = async () => {
  const result = await Student.find();

  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });

  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
