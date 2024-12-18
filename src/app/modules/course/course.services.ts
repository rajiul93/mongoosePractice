/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilders from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import { CourseSearchableFields } from './course.const';
import { TCourse } from './course.interface';
import Course from './course.model';
const createCourseDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilders(
    Course.find().populate('preRequisiteCourses.courseID'),
    query,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.courseID',
  );
  return result;
};

const getUpdateCourseFromDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemaining } = payload;
  //   step 1 : basic course update;

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const updateBasicCourseInfo = await Course.findByIdAndUpdate(
      id,
      courseRemaining,
      { new: true, runValidators: true, session },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Fail to update basic data in this request',
      );
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletePreRequisitesID = preRequisiteCourses
        .filter((el) => el.courseID && el.isDeleted)
        .map((course) => new mongoose.Types.ObjectId(course.courseID));

      const deletePreRequisitesFromCurrentCourse =
        await Course.findByIdAndUpdate(
          id,
          {
            $pull: {
              preRequisiteCourses: { courseID: { $in: deletePreRequisitesID } },
            },
          },
          {
            new: true,
            runValidators: true,
            session,
          },
        );

      if (!deletePreRequisitesFromCurrentCourse) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Fail to delete data in this request',
        );
      }
      const newPreRequisites = preRequisiteCourses.filter(
        (el) => el.courseID && !el.isDeleted,
      );
      const newPreRequisitesAddIntoDB = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },

        {
          new: true,
          runValidators: true,
          session,
        },
      );
      if (!newPreRequisitesAddIntoDB) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Fail to Add new data in this request',
        );
      }
    }

    const result = await Course.findById(id).populate(
      'preRequisiteCourses.courseID',
    );

    await session.commitTransaction();
    await session.endSession();
    return result;

  } catch (err: any) {

    await session.abortTransaction();
    await session.endSession();
    
    throw new AppError(
      httpStatus.BAD_REQUEST,
      err.message ? err.message : 'Update Fail',
    );
  }
};

const deletedCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  createCourseDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deletedCourseFromDB,
  getUpdateCourseFromDB,
};
