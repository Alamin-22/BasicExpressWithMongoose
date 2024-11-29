import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import StudentValidationSchema from './student.validation';
// import StudentValidationSchema from './student.joy.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    // creating an Schema Validation using ZOD

    // const student = req.body.student;
    // we can also get this using Name Alias
    const { student: studentData } = req.body; // => this is called name Alias in TS
    // validate data using joi and it returns the validate Data into "value" filed and error into the error.
    // so We have to pass this validate value into the Create Student func
    // const { error, value } = StudentValidationSchema.validate(studentData); => this is using Joi

    // using Zod

    const zodParserData = StudentValidationSchema.parse(studentData);

    // will be calling services  functions to send this data
    // const result = await StudentServices.createStudentIntoDB(studentData); // => passing validate value into the func
    const result = await StudentServices.createStudentIntoDB(zodParserData); // => passing validate value into the func
    // console.log({ error }, { value });

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something Went Wrong',
    //     error: error.details, // => we have to mention this to send error details for Joi
    //   });
    // }

    // send response

    res.status(200).json({
      success: true,
      message: 'Student Created Successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something Went Wrong',
      error,
    });
    console.log(error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();

    res.status(200).json({
      success: true,
      message: 'Student retrieve Successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something Went Wrong',
      error,
    });
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieve Successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something Went Wrong',
      error,
    });
    console.log(error);
  }
};
// delete single student
const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;

    const result = await StudentServices.deleteStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student deleted Successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something Went Wrong',
      error,
    });
    console.log(error);
  }
};

export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
