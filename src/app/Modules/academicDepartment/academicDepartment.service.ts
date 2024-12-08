import { TAcademicDepartment } from './academicDepartment.interface';
import { academicDepartmentModel } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payLod: TAcademicDepartment) => {
  const result = await academicDepartmentModel.create(payLod);
  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await academicDepartmentModel
    .find()
    .populate('academicFaculty');

  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await academicDepartmentModel
    .findById(id)
    .populate('academicFaculty');

  return result;
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  payLoad: Partial<TAcademicDepartment>,
) => {
  const result = await academicDepartmentModel.findOneAndUpdate(
    { _id: id },
    payLoad,
    {
      new: true,
    },
  );

  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
