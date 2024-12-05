import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicDepartmentIntoDB } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await academicDepartmentIntoDB.createAcademicDepartmentIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Academic faculty is created successfully',
    data: result,
  });
});
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentIntoDB.getAllAcademicDepartmentIntoDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Get all academic faculty  successfully',
    data: result,
  });
});
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;

  const result =
    await academicDepartmentIntoDB.getSingleAcademicDepartmentIntoDB(departmentId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'get single academic faculty successfully',
    data: result,
  });
});
const updateSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await academicDepartmentIntoDB.updateSingleAcademicDepartmentIntoDB(
      departmentId,
      req.body,
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'update academic faculty  successfully',
    data: result,
  });
});

export const academicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateSingleAcademicDepartment,
};
