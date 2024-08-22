import sortShowsByTime from "./SortShowsByTime.js";

// Function to parse date in "DD-MM-YYYY" format
const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};

// Function to collect and sort showtimes by date
const sortShowsByDate = (arr) => {
  // Initilising a map
  const dateMap = new Map();

  // Looping through each showtime from arr
  arr.forEach((show) => {
    if (!dateMap.has(show.date)) {
      dateMap.set(show.date, []);
    }
    dateMap.get(show.date).push(show);
  });

  // Setting each date's showtimes according to their time
  dateMap.forEach((showtimes, date) => {
    dateMap.set(date, sortShowsByTime(showtimes));
  });

  // Sorting dates
  const sortedDates = Array.from(dateMap.entries()).sort((a, b) => {
    return parseDate(a[0]).getTime() - parseDate(b[0]).getTime();
  });

  // Transforming the sorted Map into an array of objects
  const sortedArray = sortedDates.map(([date, showtimes]) => ({
    date,
    showtimes
  }));

  return sortedArray;
};

export default sortShowsByDate;
