import mongoose, { Schema } from 'mongoose';
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from './course.interface';

const PreRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  courseID: { type: Schema.Types.ObjectId, ref: 'Course' },
  isDeleted: { type: Boolean, default: false },
});

// Create the schema for TCourse
const CourseSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true, unique: true },
    prefix: { type: String, required: true },
    code: { type: Number, required: true },
    credits: { type: Number, required: true },
    preRequisiteCourses: [PreRequisiteCoursesSchema],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const Course = mongoose.model<TCourse>('Course', CourseSchema);

export default Course;

const CourseFacultySchema = new Schema<TCourseFaculty>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: Course,
      unique: true,
    },
    faculties: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Faculty',
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const CourseFaculty = mongoose.model<TCourseFaculty>(
  'CourseFaculty',
  CourseFacultySchema,
);
