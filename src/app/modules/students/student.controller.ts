import { catchAsync } from '../../utils/catchAsync';
import { StudentServices } from './student.service';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsDB();
  res.status(200).send({
    success: true,
    message: 'Student get successfully',
    data: result,
  });
});

const getSingleStudents = catchAsync(async (req, res) => {
  const email: string = req.params.email;
  const result = await StudentServices.getSingleStudentsDB(email);
  res.status(200).send({
    success: true,
    message: ' get single student successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudents,
};
