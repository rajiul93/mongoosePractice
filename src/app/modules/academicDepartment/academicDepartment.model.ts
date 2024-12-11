import { model, Schema } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

academicDepartmentSchema.pre('save', async function (next) { 
  const isDepartmentExist = await AcademicDepartment.findOne({
   
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new Error(`${this.name} department is already exist !`);
  }
  next();
});

academicDepartmentSchema.pre('updateOne', async function (next) {
  const query = this.getFilter(); 
  const isDepartmentExist = await AcademicDepartment.findOne({
    query,
  });
  if (!isDepartmentExist) {
    throw new Error(` department is already missing !`);
  }
  next();
});
export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
