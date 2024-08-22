
// Parsing time for comparing
const parseTime = (timeStr) => {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }
  return hours * 60 + minutes;
};

// Function to merge arrays returned from mergeSort
const mergeArrays = (arr1, arr2) => {
  let ptr1 = 0;
  let ptr2 = 0;
  const newArr = [];

  while (ptr1 < arr1.length && ptr2 < arr2.length) {
    let arr1ElemTime = parseTime(arr1[ptr1].time);
    let arr2ElemTime = parseTime(arr2[ptr2].time);

    if (arr1ElemTime < arr2ElemTime) {
      newArr.push(arr1[ptr1]);
      ptr1++;
    } else {
      newArr.push(arr2[ptr2]);
      ptr2++;
    }
  }

  while (ptr1 < arr1.length) {
    newArr.push(arr1[ptr1]);
    ptr1++;
  }

  while (ptr2 < arr2.length) {
    newArr.push(arr2[ptr2]);
    ptr2++;
  }

  return newArr;
};

// Merge sort to arrange all showtimes in order from morning to midnight
const sortShowsByTime = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }

  let mid = Math.floor(arr.length / 2);

  let arr1 = sortShowsByTime(arr.slice(0, mid));
  let arr2 = sortShowsByTime(arr.slice(mid));

  return mergeArrays(arr1, arr2);
};

export default sortShowsByTime;
