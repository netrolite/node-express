const parseNumericFilters = require("./parseNumericFilters");
const useParsedNumericFiltersInQuery = require("./useParsedNumericFiltersInQuery");

function numericFiltering(query, filters) {
    if (!filters) return query;

    const parsedFilters = parseNumericFilters(filters); // parse filters into arrays like ["price", "$gt", "30"]
    const queryWithFilters = useParsedNumericFiltersInQuery(query, parsedFilters);
    return queryWithFilters;
}

module.exports = numericFiltering;