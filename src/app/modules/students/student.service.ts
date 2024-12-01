import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student); // built in static method
  const student = new Student(studentData);
  if (await student.isUserExist(studentData.id)) {
    throw new Error('User already exists');
  }
  const result = await student.save();
  return result;
};

const getAllStudentsDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentsDB = async (email: string) => {
  const result = await Student.findOne({ email });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsDB,
  getSingleStudentsDB,
};
