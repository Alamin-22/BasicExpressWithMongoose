import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
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
    // Create a copy of the query object to exclude unnecessary fields
    const queryObj = { ...this.query };

    // Exclude fields not relevant for filtering
    const excludeFields = ['sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((field) => delete queryObj[field]);

    this.modelQuery = this?.modelQuery?.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    // Determine sort order
    const sort = this?.query?.sort ? this?.query?.sort : '-createdAt'; // Default sort by creation date descending

    this.modelQuery = this?.modelQuery?.sort(sort as string);

    return this;
  }

  paginate() {
    const limit = Number(this?.query?.limit) | 10;
    const page = Number(this?.query?.page) | 1;
    const skip = ((page - 1) * limit) | 0;

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
