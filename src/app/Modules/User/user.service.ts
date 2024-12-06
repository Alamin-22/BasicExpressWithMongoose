import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudentType } from '../Students/student.interface';
import { Student } from '../Students/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudentType) => {
  const userData: Partial<TUser> = {};
  // use Default password if pass is not provided

  userData.password = password || (config.default_password as string);

  // have to set Student Role
  userData.role = 'student';

  // find academicSemester Info
  const admissionSemesterId = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  // Auto generated Id
  userData.id = await generateStudentId(admissionSemesterId!);

  // create a student
  const newUser = await UserModel.create(userData); /// => this is called Built in Static Method

  if (Object.keys(newUser).length) {
    // set id , _id as user
    payload.id = newUser.id;
    payload.user = newUser._id; //reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
