// Utility function to filter showtimes based on the starting date
const filterShowtimes = (showtimes, startingDate) => {
  const [day, month, year] = startingDate.split("-");
  const inputDate = new Date(year, month - 1, day); // JavaScript months are 0-indexed

  return showtimes.filter((showtime) => {
    const [showDay, showMonth, showYear] = showtime.date.split("-");
    const showtimeDate = new Date(showYear, showMonth - 1, showDay);
    return showtimeDate >= inputDate;
  });
};

export default filterShowtimes;
