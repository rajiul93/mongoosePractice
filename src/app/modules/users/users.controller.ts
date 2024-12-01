import { NextFunction, Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './users.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    // const zodParsedData = studentValidationSchema.parse(studentData);
console.log(password, studentData);
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
