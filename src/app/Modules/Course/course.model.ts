import { Schema, model } from 'mongoose';
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  },
);

const courseSchema = new Schema<TCourse>(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    prefix: {
      type: String,
      trim: true,
      required: true,
    },
    code: {
      type: Number,
      trim: true,
      required: true,
    },
    credits: {
      type: Number,
      trim: true,
      required: true,
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// filter out deleted documents
courseSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

courseSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

courseSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
// 




export const CourseModel = model<TCourse>('Course', courseSchema);

const courseFacultySchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    unique: true,
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
  ],
});

export const CourseFacultyModel = model<TCourseFaculty>(
  'CourseFaculty',
  courseFacultySchema,
);
