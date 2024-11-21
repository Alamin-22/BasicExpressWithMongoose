import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    // const student = req.body.student;
    // we can also get this using Name Alias
    const { student: studentData } = req.body; // => this is called name Alias in TS
    // will be calling services  functions to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);
    // send response

    res.status(200).json({
      success: true,
      message: 'Student Created Successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const studentControllers = {
  createStudent,
};
