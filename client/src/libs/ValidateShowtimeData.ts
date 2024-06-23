import ShowtimeProps from '../props/ShowtimeProps'

const ValidateShowtimeData = (show: ShowtimeProps) => {
    const { date, language, movie, screen, time } = show

    if (!date || !time || !language || !screen || !movie || !movie._id || !movie.title) return false

    return true
}

export default ValidateShowtimeData