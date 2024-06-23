const calculateTime = (time: number) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    return minutes > 0 ? `${hours}h ${minutes}min` : `${hours}h`;
};

export default calculateTime