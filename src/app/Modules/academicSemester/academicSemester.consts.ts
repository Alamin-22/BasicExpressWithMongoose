import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TAcademicSemesterNameCodeMapper,
  TMonths,
} from './academicSemester.interface';

export const Months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const AcademicSemesterName: TAcademicSemesterName[] = [
  'Spring',
  'Summer',
  'Fall',
];

export const AcademicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];

export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  Spring: '01', // January - April
  Summer: '02', // May - August
  Fall: '03', // September - December
};
