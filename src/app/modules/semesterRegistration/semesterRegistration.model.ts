import { model, Schema } from 'mongoose';
import { ISemesterRegistration } from './semesterRegistration.interface';

const SemesterRegistrationSchema = new Schema<ISemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      required: true,
    },
    status: {
      type: String,
      enum: ['UPCOMING', 'ONGOING', 'ENDED'],
      required: true,
      default: 'UPCOMING',
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    maxCredit: { type: Number, required: true, default: 15 },
    minCredit: { type: Number, required: true, default: 3 },
  },
  {
    timestamps: true,
  },
);

export const SemesterRegistration = model<ISemesterRegistration>(
  'SemesterRegistration',
  SemesterRegistrationSchema,
);
