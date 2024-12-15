/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../error/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { Admin } from "../admin/admin.model";
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { TStudent } from '../students/student.interface';
import { Student } from '../students/student.model';
import { TUser } from './users.interface';
import { User } from './users.model';
import { generateAdminId, generateFacultyId, generateId } from './users.utils';
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
const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};



const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); 

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB
};
