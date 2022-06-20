let runningTotalOfLaps = 0;

export function handleWhichLapWeAreOn(task) {
    switch (task) {
        case "increment":
            runningTotalOfLaps++;
            break;
        case "get":
            return runningTotalOfLaps;
        case "reset":
            runningTotalOfLaps = 0;
            break;
    }
}
