const isNumeric = require("../../functions/isNumeric");
const ApiError = require("../../ApiError");

function useParsedNumericFiltersInQuery(query, filters) {
    const supportedFilteringFields = ["price", "rating"];

    filters.forEach(filter => {
        const field = filter[0]; // price
        const operator = filter[1]; // $gt
        let condition = filter[2]; // 50

        if (!supportedFilteringFields.includes(field)) {
            throw new ApiError(`Filtering field not supported. Supported: ${supportedFilteringFields}`, 400);
        }

        if (isNumeric(condition)) {
            condition = Number(condition);
        } else throw new ApiError("Conditions must be numeric", 400);

        // if query already has that filteringField, add new operator and condition to it instead of overwriting it
        if (query.hasOwnProperty(field)) {
            query[field] = addProperty(query[field], operator, condition);
        } else {
            query[field] = { [operator]: condition }
        }
    })
    return query;
}


function addProperty(object, property, value) {
    return object[property] = value;
}


module.exports = useParsedNumericFiltersInQuery;