import { Types } from 'mongoose';

export type TDay = {
  days:
    | 'Sunday'
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday';
};

export type TOfferedCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemester?: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  maxCapacity: number;
  section: number;
  days: TDay[];
  startTime: string;
  endTime: string;
};


export type TAssignedSchedule = {
  days :TDay[],
  startTime:string,
  endTime:string
  }