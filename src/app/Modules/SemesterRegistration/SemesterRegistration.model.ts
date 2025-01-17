import { model, Schema } from 'mongoose';
import { TSemesterRegistration } from './SemesterRegistration.interface';
import { semesterRegistrationStatus } from './SemesterRegistration.constant';

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {
    academicSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: semesterRegistrationStatus,
      default: 'UPCOMING',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    minCredit: {
      type: Number,
      default: 3,
    },
    maxCredit: {
      type: Number,
      default: 15,
    },
  },
  {
    timestamps: true,
  },
);

// filter out deleted documents
semesterRegistrationSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

semesterRegistrationSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

semesterRegistrationSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
//

export const SemesterRegistrationModel = model<TSemesterRegistration>(
  'SemesterRegistrations',
  semesterRegistrationSchema,
);
