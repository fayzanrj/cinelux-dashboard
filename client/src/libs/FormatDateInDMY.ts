// Function to format date in DD-MM-YYYY
const formatDateInDMY = (selectedDate: Date) => {
    const date = selectedDate.getDate();
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();

    let dateString = `${date}-${month + 1}-${year}`;

    if (dateString === "NaN-NaN-NaN") {
        dateString = formatDateInDMY(new Date());
    }

    return dateString;
};

export default formatDateInDMY