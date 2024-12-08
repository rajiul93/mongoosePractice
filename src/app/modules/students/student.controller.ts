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
const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentDB(studentId);
  res.status(200).send({
    success: true,
    message: ' get single student successfully',
    data: result,
  });
});
const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;
  console.log(student);
  const result = await StudentServices.updateSingleStudentsDB(
    studentId,
    student,
  );
  res.status(200).send({
    success: true,
    message: ' update student data successfully',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudents,
  deleteStudent,
  updateStudent,
};
