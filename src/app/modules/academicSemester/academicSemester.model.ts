import { model, Schema } from 'mongoose';
import {
  CodeAcademicSemester,
  Months,
  NameAcademicSemester,
} from './academicSemester.constants';
import { TAcademicSemester } from './academicSemester.interface';

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum: NameAcademicSemester,
  },
  code: {
    type: String,
    required: true,
    enum: CodeAcademicSemester,
  },
  year: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
    enum: Months,
    required: true,
  },
  endMonth: {
    type: String,
    enum: Months,
    required: true,
  },
});

academicSemesterSchema.pre('save', async function (next) {
  const isExistSemester = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isExistSemester) {
    throw new Error(' Semester already Exist');
  }
  next();
});

const AcademicSemester = model<TAcademicSemester>(
  'academicSemester',
  academicSemesterSchema,
);

export default AcademicSemester;
