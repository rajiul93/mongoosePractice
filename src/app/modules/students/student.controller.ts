import { catchAsync } from '../../utils/catchAsync';
import { StudentServices } from './student.service';

const getAllStudents = catchAsync(async (req, res) => {
  const query = req.query
  const result = await StudentServices.getAllStudentsDB(query);
  res.status(200).send({
    success: true,
    message: 'Student get successfully',
    data: result,
  });
});

const getSingleStudents = catchAsync(async (req, res) => {
  const id: string = req.params.id; 
  const result = await StudentServices.getSingleStudentsDB(id);
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
