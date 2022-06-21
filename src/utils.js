let runningTotalOfLaps = 0;
let liveLapInitializated = false;
let accruedLapTimes = 0;

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

export function handleLiveLap(task) {
    switch (task) {
        case "setStatusLiveLapInitializatedToTrue":
            liveLapInitializated = true;
            break;
        case "setStatusLiveLapInitializatedToFalse":
            liveLapInitializated = false;
            break;
        case "getStatusOfLiveLapInitializated":
            return liveLapInitializated;
    }
}

export function handleAccruedLapTimes(task, previousLapTime) {
    switch (task) {
        case "add":
            accruedLapTimes += previousLapTime;
        case "get":
            return accruedLapTimes;
    }
}
