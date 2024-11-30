import config from '../../config';
import { TStudentType } from '../Students/student.interface';
import { TNewUser } from './user.interface';
import { UserModel } from './user.model';

const createStudentIntoDB = async (
  password: string,
  studentData: TStudentType,
) => {
  const user: TNewUser = {};
  // use Default password if pass is not provided

  user.password = password || (config.default_password as string);

  // have to set Student Role
  user.role = 'student';

  // create a student
  const result = await UserModel.create(user); /// => this is called Built in Static Method

  // set manually generated Id
  user.id = '20240107026';

  if (Object.keys(result).length) {
    //set id , _id as user
    studentData.id = result.id;
    studentData.user = result._id;
  }
  // const student = new Student(studentData); /// => create an instance

  // if (await student.isUserExists(studentData.id)) {
  //   throw Error('User Already exists');
  // }

  // const result = await student.save(); // => this is called Built in instance method provided by mongoose

  return result;
};

export const UserServices = {
  createStudentIntoDB,
};
