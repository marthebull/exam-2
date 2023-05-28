export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}.${formattedMonth}.${year}`;
};

export const getDateDifference = (dateFrom, dateTo) => {
  const oneDay = 24 * 60 * 60 * 1000;

  const from = new Date(dateFrom);
  const to = new Date(dateTo);

  const differenceInDays = Math.round(Math.abs((from - to) / oneDay));

  return differenceInDays;
};
