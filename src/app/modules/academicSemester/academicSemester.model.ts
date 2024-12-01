import { model, Schema } from 'mongoose';
import { CodeAcademicSemester, Months, NameAcademicSemester } from './academicSemester.constants';
import {
  TAcademicSemester
} from './academicSemester.interface';


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

const AcademicSemester = model<TAcademicSemester>(
  'academicSemester',
  academicSemesterSchema,
);

export default AcademicSemester;
