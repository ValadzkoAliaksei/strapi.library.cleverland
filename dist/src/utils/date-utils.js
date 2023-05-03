"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDateEqual = exports.isDateHoliday = exports.isDateAfter = exports.isDateBefore = exports.isDateValidate = void 0;
const isDateValidate = (value) => typeof value.getTime !== "function" || isNaN(value.getTime());
exports.isDateValidate = isDateValidate;
const isDateBefore = (date, baseDate) => date.setHours(0, 0, 0, 0) < baseDate.setHours(0, 0, 0, 0);
exports.isDateBefore = isDateBefore;
const isDateAfter = (date, baseDate) => {
    const parseDate = date.setHours(0, 0, 0, 0);
    let parseBaseDate = baseDate.setHours(0, 0, 0, 0);
    if (baseDate.getDay() === 0) {
        parseBaseDate = new Date(parseBaseDate).setDate(baseDate.getDate() + 1);
    }
    if (baseDate.getDay() === 6) {
        parseBaseDate = new Date(parseBaseDate).setDate(baseDate.getDate() + 2);
    }
    return parseDate > parseBaseDate;
};
exports.isDateAfter = isDateAfter;
const isDateHoliday = (date) => date.getDay() === 0 || date.getDay() === 6;
exports.isDateHoliday = isDateHoliday;
const isDateEqual = (date, baseDate) => {
    const parseDate = date.setHours(0, 0, 0, 0);
    let parseBaseDate = baseDate.setHours(0, 0, 0, 0);
    return parseDate === parseBaseDate;
};
exports.isDateEqual = isDateEqual;
