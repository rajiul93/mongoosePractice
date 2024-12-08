import mongoose from 'mongoose';
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
    _id: studentData.academicSemester,
  });
  if (!admissionSemester) {
    throw new Error('Admission semester not found!');
  }
  //set student role
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.role = 'student';
    userData.id = await generateId(admissionSemester);
    // create a user

    const newUser = await User.create([userData], { session });
    //create a student
    if (!newUser.length) {
      throw new Error(' Fail create user by session');
    }
    // set id , _id as user
    studentData.id = newUser[0].id;
    studentData.userID = newUser[0]._id; //reference _id

    const newStudent = await Student.create([studentData], { session });
    if (!newStudent.length) {
      throw new Error(' Fail create student by session');
    }

    await session.commitTransaction()
    await session.endSession()
    return newStudent;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
   session.abortTransaction()
   session.endSession()
   throw new Error(error.message?  error.message : " create error when start transaction")
  }
};

export const UserServices = {
  createStudentIntoDB,
};
