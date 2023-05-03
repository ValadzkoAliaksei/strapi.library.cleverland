"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRatingUser = exports.getRating = void 0;
const getRating = (comments) => {
    var _a;
    return (comments === null || comments === void 0 ? void 0 : comments.data.length)
        ? Math.round((((_a = comments.data) === null || _a === void 0 ? void 0 : _a.reduce((acc, { attributes: { rating } }) => {
            acc = acc + rating;
            return acc;
        }, 0)) /
            comments.data.length) *
            100) / 100
        : null;
};
exports.getRating = getRating;
const getRatingUser = (comments) => {
    const rating = (comments === null || comments === void 0 ? void 0 : comments.length)
        ? Math.round(((comments === null || comments === void 0 ? void 0 : comments.reduce((acc, { rating }) => {
            acc = acc + rating;
            return acc;
        }, 0)) /
            comments.length) *
            100) / 100
        : null;
    return rating;
};
exports.getRatingUser = getRatingUser;
