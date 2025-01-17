import { model, Schema } from 'mongoose';
import { TSemesterRegistration } from './SemesterRegistration.interface';

const semesterRegistrationSchema = new Schema<TSemesterRegistration>(
  {},
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

export const SemesterRegistrationModel= model<TSemesterRegistration>("SemesterRegistrations",semesterRegistrationSchema)


