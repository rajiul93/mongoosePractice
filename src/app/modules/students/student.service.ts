import { Student } from './student.model';

const getAllStudentsDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentsDB = async (email: string) => {
  const result = await Student.findOne({ email });
  return result;
};

export const StudentServices = {
  getAllStudentsDB,
  getSingleStudentsDB,
};
