import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { academicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

    // passing the response to the Reusable func
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is Created Successfully',
      data: result,
    });
  },
);

const getAllAcademicDepartments: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await academicDepartmentServices.getAllAcademicDepartmentsFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Academic Departments are Retrieve',
      data: result,
    });
  },
);

const getSingleAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const { DepartmentId } = req.params;
    const result =
      await academicDepartmentServices.getSingleAcademicDepartmentFromDB(
        DepartmentId,
      );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Academic Department Retrieve',
      data: result,
    });
  },
);

const updateAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const { DepartmentId } = req.params;

    const result =
      await academicDepartmentServices.updateAcademicDepartmentIntoDB(
        DepartmentId,
        req.body,
      );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Department Data Updated Successfully',
      data: result,
    });
  },
);

export const academicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
