import { academicSemesterNameCodeMapper } from './academicSemester.constants';
import { TAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

const getAllAcademicSemesterDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};
const getSpecificAcademicSemesterDB = async (id: string) => {
  const result = await AcademicSemester.findById({ _id: id });
  return result;
};
const createAcademicSemesterDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};
const updateAcademicSemesterDB = async (
  payload: TAcademicSemester,
  id: string,
) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid semester code');
  }
  const previousSemesterData: TAcademicSemester | null =
    await AcademicSemester.findById({ _id: id });

  if (!previousSemesterData) {
    throw new Error('Update data  missing');
  }

  const updateDoc: TAcademicSemester = {
    name: payload.name || previousSemesterData?.name,
    code: payload.code || previousSemesterData?.code,
    year: payload.year || previousSemesterData?.year,
    startMonth: payload.startMonth || previousSemesterData?.startMonth,
    endMonth: payload.endMonth || previousSemesterData?.endMonth,
  };

  const result = await AcademicSemester.findById(
    id,
    { $set: updateDoc },
    { new: true },
  );
  return result;
};

export const AcademicServices = {
  createAcademicSemesterDB,
  getAllAcademicSemesterDB,
  getSpecificAcademicSemesterDB,
  updateAcademicSemesterDB,
};
