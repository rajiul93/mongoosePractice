import { Types } from 'mongoose';

export type TPreRequisiteCourses = {
  courseID: Types.ObjectId;
  isDeleted: boolean;
  default: boolean
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: TPreRequisiteCourses[];
  isDeleted: boolean;
//   createdAt: Date;
//   updatedAt: Date;
};
