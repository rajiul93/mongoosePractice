import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student } = req.body;
    const result = await StudentServices.createStudentIntoDB(student);
    res.status(200).send({
      success: true,
      message: 'Student create successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsDB();
    res.status(200).send({
      success: true,
      message: 'Student get successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const email: string = req.params.email;
    const result = await StudentServices.getSingleStudentsDB(email);
    res.status(200).send({
      success: true,
      message: ' get single student successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudents,
};
