"use strict";
/**
 * if allowed field key is not present on unfiltered object, it wont add it
 * @param {object} unfilteredObj
 * @param {array} allowedFields
 * @returns {object}
 */
function filterUnwantedFields(unfilteredObj, allowedFields) {
  const filteredObj = {};

  Object.keys(unfilteredObj).forEach((key) => {
    if (allowedFields.includes(key)) {
      filteredObj[key] = unfilteredObj[key];
    }
  });

  return filteredObj;
}

module.exports = {
  filterUnwantedFields,
};
