export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const validateDate = (date) => {
  const regex = /^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[0-2])-\d{4}$/;
  return regex.test(date);
};

export const validateTime = (time) => {
  const regex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
  return regex.test(time);
};
