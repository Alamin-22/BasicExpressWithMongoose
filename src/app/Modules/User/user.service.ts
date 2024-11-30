import config from '../../config';
import { TStudentType } from '../Students/student.interface';
import { Student } from '../Students/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createStudentIntoDB = async (
  password: string,
  studentData: TStudentType,
) => {
  const userData: Partial<TUser> = {};
  // use Default password if pass is not provided

  userData.password = password || (config.default_password as string);

  // have to set Student Role
  userData.role = 'student';

  // set manually generated Id
  userData.id = '20240117026';

  // create a student
  const result = await UserModel.create(userData); /// => this is called Built in Static Method

  if (Object.keys(result).length) {
    //set id , _id as user
    studentData.id = result.id;
    studentData.user = result._id; // reference id
    const student = new Student(studentData); /// => create an instance

    return await student.save(); // => this is called Built in instance method provided by mongoose;
  }

  // if (await student.isUserExists(studentData.id)) {
  //   throw Error('User Already exists');
  // }

  // const result = await student.save(); // => this is called Built in instance method provided by mongoose
};

export const UserServices = {
  createStudentIntoDB,
};
