import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsDB();
    res.status(200).send({
      success: true,
      message: 'Student get successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const email: string = req.params.email;
    const result = await StudentServices.getSingleStudentsDB(email);
    res.status(200).send({
      success: true,
      message: ' get single student successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentController = {
  getAllStudents,
  getSingleStudents,
};
