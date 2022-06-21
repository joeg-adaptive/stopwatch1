import { getFormattedTime } from "./formatter.js";
import { isTimerRunning, handlePlaceHolderTable } from "./index.js";
import {
    createAndHandleLiveLapTime,
    $tableRowWithLiveLapTime,
} from "./tableManager.js";
import {
    handleWhichLapWeAreOn,
    handleLiveLap,
    handleAccruedLapTimes,
    handleFastestLapElementAndTime,
    handleSlowestLapElementAndTime,
} from "./utils.js";

let $stopWatchClock = document.querySelector("[data-id=stopWatchClock]");
let startTime = 0;
let theTimer = undefined;
let liveTime = false;

export function continouslyRunningTimer($stopWatchClock) {
    $stopWatchClock.innerText = getFormattedTime(Date.now() - startTime);
    $tableRowWithLiveLapTime.innerText = getFormattedTime(
        Date.now() - startTime - handleAccruedLapTimes("get")
    );
    theTimer = requestAnimationFrame(() =>
        continouslyRunningTimer($stopWatchClock)
    );
}

export function startTimer() {
    if (isTimerRunning()) {
        startTime += Date.now();
        createAndHandleLiveLapTime();
        continouslyRunningTimer($stopWatchClock);
    }
}

export function stopTimer() {
    if (!isTimerRunning()) {
        startTime -= Date.now();
        cancelAnimationFrame(theTimer);
    }
}

export function getCurrentTimeOnTimer() {
    return Date.now() - startTime;
}

export function resetValues() {
    startTime = 0;
    $stopWatchClock.innerText = "00:00.00";
    liveTime = false;
    handleLiveLap("setStatusLiveLapInitializatedToFalse");
    handleWhichLapWeAreOn("reset");
    handleAccruedLapTimes("reset");
    handleFastestLapElementAndTime("reset");
    handleSlowestLapElementAndTime("reset");
    document.querySelectorAll("tr").forEach((element) => {
        element.parentNode.removeChild(element);
    });
    handlePlaceHolderTable();
}
