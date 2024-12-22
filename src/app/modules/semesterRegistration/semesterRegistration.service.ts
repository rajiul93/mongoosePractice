import httpStatus from 'http-status';
import QueryBuilders from '../../builder/QueryBuilder';
import AppError from '../../error/AppError';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { RegistrationStatus } from './semesterRegistration.constant';
import { ISemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
const createSemesterRegistrationDB = async (payload: ISemesterRegistration) => {
  const academicSemester = payload.academicSemester;
  //   find valid academic semester
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester not fount',
    );
  }

  //   check do not duplicate
  const isAcademicSemesterRegistrationExists =
    await SemesterRegistration.findOne({
      ...payload,
    });

  if (isAcademicSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This  semester already exist ');
  }

  // check if there any registered semester that is already "upcoming" | "ongoing"
  const isThereAnyUpcomingOrOngoingSemester =
    await SemesterRegistration.findOne({
      $or: [{ status: 'UPCOMING' }, { status: 'ONGOING' }],
    });
  if (isThereAnyUpcomingOrOngoingSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `there is already an ${isThereAnyUpcomingOrOngoingSemester.status} registered !`,
    );
  }
  const result = await SemesterRegistration.create(payload);

  return result;
};
const getAllSemesterRegistrationDB = async (query: Record<string, unknown>) => {
  const semesterRegisterQuery = new QueryBuilders(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegisterQuery.modelQuery;
  return result;
};
const getSingleSemesterRegistrationDB = async (id: string) => {
  const result =
    await SemesterRegistration.findById(id).populate('academicSemester');
  return result;
};
const updateSemesterRegistrationDB = async (
  id: string,
  payload: Partial<ISemesterRegistration>,
) => {
  // check the semester is exist
  const requestSemester = await SemesterRegistration.findById(id);
  const currentStatus = requestSemester?.status;
  const requestStatus = payload.status;

  if (!requestSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'This  semester data messing ');
  }

  switch (currentStatus) {
    case RegistrationStatus.ENDED:
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `this semester already ${currentStatus}`,
      );

    case RegistrationStatus.UPCOMING:
      if (requestStatus === RegistrationStatus.ENDED) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `directly is not possible ${currentStatus} to ${requestStatus}`,
        );
      }
      break;

    case RegistrationStatus.ONGOING:
      if (requestStatus === RegistrationStatus.UPCOMING) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `directly is not possible ${currentStatus} to ${requestStatus}`,
        );
      }
      break;

    default:
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Unexpected status: ${currentStatus}`,
      );
  }
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const semesterRegistrationService = {
  createSemesterRegistrationDB,
  getAllSemesterRegistrationDB,
  getSingleSemesterRegistrationDB,
  updateSemesterRegistrationDB,
};
