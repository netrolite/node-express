const sameArrays = require("../../functions/sameArrays");
const operators = require("./mongodbOperators");

/*
    convert filters from ["price<50"]
    to [["price", "$lt", "50"]]
    // using an array so I can add more filters later
*/

function parseNumericFilters(filters) {
    filters = filters.split(",");

    const parsedFilters = filters.map(filter => {
        for (const operator of Object.keys(operators)) {
            let splitFilter = filter.split(operator);

            // using [filter] because splitFilter is always an array but filter is a string
            if (!sameArrays([filter], splitFilter)) {
                // insert mongoDB operator between filtering field (price) and condition (50)
                splitFilter.splice(1, 0, operators[operator]);
                return splitFilter;
            }
        }
    })
    return parsedFilters;
}

module.exports = parseNumericFilters