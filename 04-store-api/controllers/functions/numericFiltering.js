const isNumeric = require("../../functions/isNumeric");
const parseNumericFilters = require("./parseNumericFilters");

function numericFiltering(query, filters) {
    if (!filters) return query;

    const parsedFilters = parseNumericFilters(filters); // parse filters into arrays like ["price", "$gt", "30"]
    console.log("parsed filters:", parsedFilters);

    console.log("query before:", query);

    parsedFilters.forEach(filter => {
        const filteringField = filter[0]; // price
        const operator = filter[1]; // $gt
        const condition = filter[2]; // 50

        query[filteringField] = {
            [operator]: condition
        }
    })

    console.log("query after:", query);

    return query;
}

module.exports = numericFiltering;