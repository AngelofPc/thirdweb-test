export function addMonths(date: string | number | Date, months: number) {
  const dateCopy = new Date(date);

  dateCopy.setMonth(dateCopy.getMonth() + months);

  return dateCopy;
}

export function addWeeks(date: string | number | Date, weeks: number) {
  const dateCopy = new Date(date);
  dateCopy.setDate(dateCopy.getDate() + 7 * weeks);
  return dateCopy;
}
