import { academicSemesterNameCodeMapper } from './academicSemester.consts';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payLod: TAcademicSemester) => {
  // Checking the Semester code with the help of a mapper
  if (academicSemesterNameCodeMapper[payLod.name] !== payLod.code) {
    throw new Error('Invalid Semester Code');
  }
  const result = await AcademicSemesterModel.create(payLod);

  return result;
};

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemesterModel.find();

  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemesterModel.findById(id);

  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payLoad: Partial<TAcademicSemester>,
) => {
  // validate the Semester Code
  if (
    payLoad.name &&
    payLoad.code &&
    academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code
  ) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemesterModel.findOneAndUpdate(
    { _id: id },
    payLoad,
    {
      new: true,
    },
  );

  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
