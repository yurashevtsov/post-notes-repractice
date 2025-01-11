"use strict";
/**
 * if allowed field key is not present on unfiltered object, it wont add it
 * @param {object} unfilteredObj
 * @param {array} allowedFields
 * @returns {object}
 */
function filterUnwantedFields(unfilteredObj, allowedFields) {
  const filteredObj = {};

  allowedFields.forEach((field) => {
    if (unfilteredObj[field] !== undefined) {
      filteredObj[field] = unfilteredObj[field];
    }
  });

  return filteredObj;
}

module.exports = {
  filterUnwantedFields,
};
