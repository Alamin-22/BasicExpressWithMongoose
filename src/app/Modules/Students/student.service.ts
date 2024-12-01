import { Student } from './student.model';

const getAllStudentFromDB = async () => {
  const result = await Student.find();

  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id }); // we can achieve it by using mongoDb aggregate

  const result = await Student.aggregate([
    {
      $match: { id: id },
    },
  ]);

  return result;
};
// delete students form Db
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });

  return result;
};

export const StudentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
