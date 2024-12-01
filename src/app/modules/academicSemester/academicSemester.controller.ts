import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicServices.createAcademicSemesterDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  });
});

export const AcademicController = {
  createAcademicSemester,
};
