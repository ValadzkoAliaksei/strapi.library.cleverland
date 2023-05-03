export const isDateValidate = (value: Date) =>
  typeof value.getTime !== "function" || isNaN(value.getTime());

export const isDateBefore = (date: Date, baseDate: Date) =>
  date.setHours(0, 0, 0, 0) < baseDate.setHours(0, 0, 0, 0);

export const isDateAfter = (date: Date, baseDate: Date) => {
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

export const isDateHoliday = (date: Date) =>
  date.getDay() === 0 || date.getDay() === 6;

export const isDateEqual = (date: Date, baseDate: Date) => {
  const parseDate = date.setHours(0, 0, 0, 0);
  let parseBaseDate = baseDate.setHours(0, 0, 0, 0);
  return parseDate === parseBaseDate;
};
