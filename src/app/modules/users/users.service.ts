import config from '../../config';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './users.interface';
import { User } from './users.model';
import { generateId } from './users.utils';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set manually generated it

  const admissionSemester = await AcademicSemester.findById({
    _id: studentData.admissionSemester,
  });
  if (!admissionSemester) {
    throw new Error('Admission semester not found!');
  }
  //set student role
  userData.role = 'student';
  userData.id = await generateId(admissionSemester);
  // create a user

  const newUser = await User.create(userData);
  //create a student
  if (Object.keys(newUser).length) {
    // set id , _id as user
    studentData.id = newUser.id;
    studentData.userID = newUser._id; //reference _id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
