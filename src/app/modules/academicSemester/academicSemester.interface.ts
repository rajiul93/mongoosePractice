export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type TNameAcademicSemester = 'Autumn' | 'Summer' | 'Fall';
export type TCodeAcademicSemester = '01' | '02' | '03';


export type TAcademicSemester = {
  name: TNameAcademicSemester;
  code: TCodeAcademicSemester;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};
