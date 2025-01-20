import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const loginUser = catchAsync(async (req, res) => {
  const result = '';
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin Member is deleted successfully',
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
};
