import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { SemesterRegistrationServices } from './SemesterRegistration.services';

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
        req.body,
      );

    // sending data to the API
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration Successfully Completed ',
      data: result,
    });
  },
);

const getAllSemesterRegistrations = catchAsync(
  async (req: Request, res: Response) => {
    const AllRegistrations =
      await SemesterRegistrationServices.getAllSemesterRegistrationsFromDB(
        req.body,
      );

    // sending data to the API
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Semester Registrations Successfully Retrieve ',
      data: AllRegistrations,
    });
  },
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const singleRegistration =
      await SemesterRegistrationServices.getSingleSemesterRegistrationsFromDB(
        id,
      );

    // sending data to the API
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'single Semester Registrations Successfully Retrieve ',
      data: singleRegistration,
    });
  },
);

export const SemesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
};
