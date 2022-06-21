let runningTotalOfLaps = 0;
let liveLapInitializated = false;
let accruedLapTimes = 0;
let fastestLapElementAndTime = { fastestTime: null, fastestLap: null };
let slowestLapElementAndTime = { slowestTime: null, slowestLap: null };

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
            break;
        case "reset":
            accruedLapTimes = 0;
            break;
        case "get":
            return accruedLapTimes;
    }
}
export function handleFastestLapElementAndTime(task, $lapElement, speed) {
    switch (task) {
        case "setSpeedAndLap":
            fastestLapElementAndTime.fastestTime = speed;
            fastestLapElementAndTime.fastestLap = $lapElement;
            break;
        case "getSpeed":
            return fastestLapElementAndTime.fastestTime;
        case "getLap":
            return fastestLapElementAndTime.fastestLap;
        case "reset":
            fastestLapElementAndTime.fastestLap = null;
            fastestLapElementAndTime.fastestTime = null;
            break;
    }
}
export function handleSlowestLapElementAndTime(task, $lapElement, speed) {
    switch (task) {
        case "setSpeedAndLap":
            slowestLapElementAndTime.slowestTime = speed;
            slowestLapElementAndTime.slowestLap = $lapElement;
            break;
        case "getSpeed":
            return slowestLapElementAndTime.slowestTime;
        case "getLap":
            return slowestLapElementAndTime.slowestLap;
        case "reset":
            slowestLapElementAndTime.slowestTime = null;
            slowestLapElementAndTime.slowestLap = null;
            break;
    }
}
