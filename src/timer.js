import { getFormattedTime } from "./formatter.js";
import { isTimerRunning, handlePlaceHolderTable } from "./index.js";
import {
    //createAndHandleLiveLapTime,
    $tableRowWithLiveLapTime,
} from "./tableManager.js";
import { handleWhichLapWeAreOn } from "./utils.js";

let $stopWatchClock = document.querySelector("[data-id=stopWatchClock]");
let startTime = 0;
let theTimer = undefined;
let liveTime = false;

export function continouslyRunningTimer($stopWatchClock) {
    $stopWatchClock.innerText = getFormattedTime(Date.now() - startTime);
    // $tableRowWithLiveLapTime.innerText = getFormattedTime(
    //     Date.now() - startTime
    // );
    theTimer = requestAnimationFrame(() =>
        continouslyRunningTimer($stopWatchClock)
    );
}

export function startTimer() {
    if (isTimerRunning()) {
        startTime += Date.now();
        initiateLiveTimeTable();
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
    handleWhichLapWeAreOn("reset");
    document.querySelectorAll("tr").forEach((element) => {
        element.parentNode.removeChild(element);
    });
    handlePlaceHolderTable();
}

const initiateLiveTimeTable = () => {
    if (liveTime === false) {
        //createAndHandleLiveLapTime();
    }
    liveTime = true;
};
