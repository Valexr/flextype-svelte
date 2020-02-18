"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compareStrings(sA, sB) {
    return sA > sB ? 1 : sA < sB ? -1 : 0;
}
exports.compareStrings = compareStrings;
function compareNumbers(sA, sB) {
    return sA - sB;
}
exports.compareNumbers = compareNumbers;
function reverse(r) {
    return -r;
}
exports.reverse = reverse;
function compareStringsCaseInsensitive(sA, sB) {
    return sA.localeCompare(sB, undefined, {
        sensitivity: 'base',
    });
}
exports.compareStringsCaseInsensitive = compareStringsCaseInsensitive;
function sortFunction(gen) {
    return (a, b) => {
        for (let comp of gen(a, b)) {
            if (comp) {
                return comp;
            }
        }
        return 0;
    };
}
exports.sortFunction = sortFunction;