import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payLod: TAcademicSemester) => {
  const result = await AcademicSemesterModel.create(payLod);

  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
};
