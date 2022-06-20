export function getFormattedTime(timeInMilliseconds) {
    let formattedMinutes = Math.floor(timeInMilliseconds / 60000)
        .toString()
        .padStart(2, "0");

    timeInMilliseconds -= formattedMinutes * 60000;
    let formattedSeconds = Math.floor(timeInMilliseconds / 1000)
        .toString()
        .padStart(2, "0");

    timeInMilliseconds -= formattedSeconds * 1000;
    let formattedCentiseconds = Math.floor(timeInMilliseconds / 10)
        .toString()
        .padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}.${formattedCentiseconds}`;
}
