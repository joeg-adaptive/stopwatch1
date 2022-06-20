import { startTimer, stopTimer, resetValues } from "./timer.js";
import { createTables, createInvisibleTable } from "./tableManager.js";

let $startStopButton = document.querySelector("[data-id=startStop]");
let $resetLapButton = document.querySelector("[data-id=resetLap]");
let isRunning = false;
let placeHolderLinesInitialized = false;

function startStop() {
    if (isTimerRunning()) {
        $startStopButton.className = "start";
        $startStopButton.innerText = "Start";
        $resetLapButton.innerText = "Reset";
        isRunning = false;
        stopTimer();
    } else {
        $startStopButton.className = "stop";
        $startStopButton.innerText = "Stop";
        $resetLapButton.innerText = "Lap";
        isRunning = true;
        startTimer();
    }
}

function resetLap() {
    if (!isTimerRunning()) {
        resetValues();
    } else {
        createTables();
    }
}

export function isTimerRunning() {
    return isRunning;
}

//Self calling function to create empty table for apperance
handlePlaceHolderTable();
export function handlePlaceHolderTable() {
    if (!placeHolderLinesInitialized) {
        createInvisibleTable();
        placeHolderLinesInitialized = true;
    } else {
        placeHolderLinesInitialized = false;
        handlePlaceHolderTable();
    }
}

$startStopButton.addEventListener("click", startStop);
$resetLapButton.addEventListener("click", resetLap);
