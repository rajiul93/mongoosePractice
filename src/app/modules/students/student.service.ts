import mongoose from 'mongoose';
import { User } from '../users/users.model';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentsDB = async () => {
  const result = await Student.find()
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    })
    .populate('academicSemester');
  return result;
};
const getSingleStudentsDB = async (email: string) => {
  const result = await Student.findOne({ email });
  return result;
};
const updateSingleStudentsDB = async (
  id: string,
  payload: Partial<TStudent>,
) => {
  const { name, guardian, localGuardian, ...remainingStudent } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudent,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteStudentDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteStudent) {
      throw new Error('Student delete fail');
    }
    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new Error('User delete fail');
    }
    await session.commitTransaction();
    await session.endSession();
    return deleteStudent;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(`Ger error my session message is: ${error.message}`);
  }
};

export const StudentServices = {
  getAllStudentsDB,
  getSingleStudentsDB,
  deleteStudentDB,
  updateSingleStudentsDB,
};
