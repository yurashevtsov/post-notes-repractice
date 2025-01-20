"use strict";

class AppFeatures {
  constructor(databaseQuery, queryStr) {
    this.databaseQuery = databaseQuery;
    this.queryStr = queryStr;
  }

  //   could accept array/string of acceptable fields and filter by them, so this class could be used by other tables
  sort() {
    if (this.queryStr?.order) {
      this.databaseQuery.order = this.queryStr.order.map((el) => el.split("_"));
    }

    return this;
  }

  //   could pass an argument to overwrite limit for findOne cases
  paginate() {
    this.databaseQuery.page = this.queryStr.page;
    this.databaseQuery.limit = this.queryStr.limit;
    this.databaseQuery.offset = (this.queryStr.page - 1) * this.queryStr.limit;

    return this;
  }

  // if I get unknown field, it will throw an error, what if I'll use filter to get only known fields before putting it there?
  limitFields() {
    if (this.queryStr?.fields) {
      this.databaseQuery.attributes = this.queryStr.fields;
    }
    return this;
  }
}

module.exports = AppFeatures;
