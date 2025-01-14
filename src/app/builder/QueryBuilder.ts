import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  populate(path: string) {
    this.modelQuery = this.modelQuery.populate(path) as Query<T[], T>;
    return this;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((field) => delete queryObj[field]);

    this.modelQuery = this?.modelQuery?.find(queryObj as FilterQuery<T>);
    return this;
  }

  sort() {
    const sort = this?.query?.sort ? this?.query?.sort : '-createdAt';
    this.modelQuery = this?.modelQuery?.sort(sort as string);
    return this;
  }

  paginate() {
    const limit = Number(this?.query?.limit) || 10;
    const page = Number(this?.query?.page) || 1;
    const skip = (page - 1) * limit;

    this.modelQuery = this?.modelQuery?.skip(skip)?.limit(limit);
    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-_v';

    this.modelQuery = this?.modelQuery?.select(fields);
    return this;
  }
}

export default QueryBuilder;
