import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AcademicServices } from './academicSemester.service';

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicServices.getAllAcademicSemesterDB();

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  });
});
const getSpecificAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicServices.getSpecificAcademicSemesterDB(
    req.params.id,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  });
});
const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicServices.createAcademicSemesterDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  });
});
const updateAcademicSemester = catchAsync(async (req, res) => {
  const { academicSemester } = req.body.academicSemester;
  const id = req.params.id;
  const result = await AcademicServices.updateAcademicSemesterDB(
    academicSemester,
    id,
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Academic semester is created successfully',
    data: result,
  });
});

export const AcademicController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSpecificAcademicSemester,
  updateAcademicSemester,
};
