const formatIMDBMovieDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');

    return `${day}-${parseInt(month)}-${year}`;

}
export default formatIMDBMovieDate