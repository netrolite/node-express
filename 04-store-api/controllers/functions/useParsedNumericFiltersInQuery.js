const isNumeric = require("../../functions/isNumeric");
const ApiError = require("../../ApiError");

function useParsedNumericFiltersInQuery(query, filters) {
    filters.forEach(filter => {
        const filteringField = filter[0]; // price
        const operator = filter[1]; // $gt
        let condition = filter[2]; // 50

        if (isNumeric(condition)) {
            condition = Number(condition);
        } else throw new ApiError("Conditions must be numeric", 400);

        // if query already has that filteringField, add new operator and condition to it instead of overwriting it
        if (query.hasOwnProperty(filteringField)) {
            const updatedProperty = query[filteringField];
            updatedProperty[operator] = condition;
            query[filteringField] = updatedProperty;
        } else {
            query[filteringField] = { [operator]: condition }
        }
    })
    return query;
}

module.exports = useParsedNumericFiltersInQuery;