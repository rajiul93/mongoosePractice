import mongoose from 'mongoose';
import QueryBuilders from '../../builder/QueryBuilder';
import { User } from '../users/users.model';
import { studentSearchableFields } from './student.constant';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const getAllStudentsDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilders(
    Student.find()
      .populate({
        path: 'academicDepartment',
        populate: {
          path: 'academicFaculty',
        },
      })
      .populate('academicSemester'),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;

  return result;
};

const getSingleStudentsDB = async (id: string) => { 
  const result = await Student.findOne({ id });
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

//  if you want to learn is this row pattern
// const getAllStudentsDB = async (query: Record<string, unknown>) => {
//   let searchTerm = '';

//   if (query?.searchTerm) {
//     searchTerm = query?.searchTerm as string;
//   }

//   const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];
//   const searchQuery = Student.find({
//     $or: studentSearchableFields.map((field) => ({
//       [field]: { $regex: searchTerm, $options: 'i' },
//     })),
//   });

//   const queryObj = { ...query };
//   const excludeFields = ['searchTerm', 'sort', 'limit', 'page', "fields"];
//   excludeFields.forEach((el) => delete queryObj[el]);

//   const filterQuery = searchQuery
//     .find(queryObj)
//     .populate({
//       path: 'academicDepartment',
//       populate: {
//         path: 'academicFaculty',
//       },
//     })
//     .populate('academicSemester');

//   let sort = '-createdAt';

//   if (query.sort) {
//     sort = query.sort as string;
//   }
//   let limit = 1;
//   let skip = 0;
//   let page = 1;

//   if (query.limit) {
//     limit = Number(query.limit) as number;
//   }
//   if (query.page) {
//     page = Number(query.page);
//     skip = Number(page - 1) as number;
//   }
//   const sortQuery = filterQuery.sort(sort);
//   const paginateQuery = sortQuery.skip(skip);

//   const limitQuery = paginateQuery.limit(limit);

//   let fields = '-__v';
//   if (query.fields) {
//     fields = (query.fields as string).split(',').join(' ');
//   }

//   const fieldsQuery = await limitQuery.select(fields);
//   return fieldsQuery;
// };
