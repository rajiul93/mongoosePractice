import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import Course from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offerCourse.interface';
import { OfferedCourse } from './offerCourse.model';
import { hasTimeConflictCheck } from './offerCourse.utils';

const createOfferCourseDB = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  const isSemesterRegistrationExits =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExits) {
    throw new AppError(httpStatus.NOT_FOUND, `semester registration not found`);
  }
  const academicSemester = isSemesterRegistrationExits.academicSemester;

  const isAcademicFacultyExits =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, `Academic Faculty not found`);
  }
  const isAcademicDepartmentExits =
    await AcademicDepartment.findById(academicDepartment);

  if (!isAcademicDepartmentExits) {
    throw new AppError(httpStatus.NOT_FOUND, `Academic Department not found`);
  }
  const isCourseExits = await Course.findById(course);
  if (!isCourseExits) {
    throw new AppError(httpStatus.NOT_FOUND, `course not found`);
  }
  const isFacultyExits = await Faculty.findById(faculty);
  if (!isFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, `Faculty not found`);
  }

  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    academicFaculty: academicFaculty,
    _id: academicDepartment,
  });
  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `This  ${isAcademicDepartmentExits.name}  is not exist ${isAcademicFacultyExits.name}`,
    );
  }

  //   check same offer curse is exist or not current database

  const isOfferCourseExist = await OfferedCourse.findOne({
    semesterRegistration: semesterRegistration,
    course: course,
    section,
  });
  if (isOfferCourseExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This offer course already exist in same section`,
    );
  }

  const checkSameTimeSameFacultyIfExist = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflictCheck(checkSameTimeSameFacultyIfExist, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This time already Booking for this faculty`,
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};
const getAllOfferCourseDB = async (query: Partial<TOfferedCourse>) => {
  const result = await OfferedCourse.find();
  return result;
};
const getSingleOfferCourseDB = async (id: string) => {
  const result = await OfferedCourse.findById(id);
  return result;
};

const updateOfferCourseDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'startTime' | 'endTime' | 'days'>,
) => {
  const { faculty, days, startTime, endTime } = payload;
  const isOfferedCourseExist = await OfferedCourse.findById(id);
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, `Offered Course not found !`);
  }
  const isFacultyExist = await Faculty.findById(payload.faculty);
  if (!isFacultyExist) {
    throw new AppError(httpStatus.NOT_FOUND, `Faculty not found !`);
  }

  const semesterRegistration = isOfferedCourseExist.semesterRegistration;

  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);

  if (semesterRegistrationStatus?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can't update Offered course because  This semester are ${semesterRegistrationStatus?.status} when semester upcoming then only can update`,
    );
  }

  const checkSameTimeSameFacultyIfExist = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };

  if (hasTimeConflictCheck(checkSameTimeSameFacultyIfExist, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      `This time already Booking for this faculty`,
    );
  }

  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

export const OfferedCourseService = {
  createOfferCourseDB,
  getAllOfferCourseDB,
  updateOfferCourseDB,
  getSingleOfferCourseDB,
};
