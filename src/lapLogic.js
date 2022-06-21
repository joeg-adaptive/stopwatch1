import { getFormattedTime } from "./formatter.js";
import { getCurrentTimeOnTimer } from "./timer.js";
import { handleAccruedLapTimes, handleWhichLapWeAreOn } from "./utils.js";

let lastLapTime = 0;
let fastestLapElementAndTime = { fastestTime: 0, fastestLap: 0 };
let slowestLapElementAndTime = { slowestTime: 0, slowestLap: 0 };

export function lapTimeCalculator() {
    let previousLapTime = 0;
    if (handleWhichLapWeAreOn("get") === 0) {
        lastLapTime = getCurrentTimeOnTimer();
        previousLapTime = lastLapTime;
    } else {
        previousLapTime = getCurrentTimeOnTimer() - lastLapTime;
        lastLapTime = getCurrentTimeOnTimer();
    }
    handleAccruedLapTimes("add", previousLapTime);
    return getFormattedTime(previousLapTime);
}

export function findSlowAndFast() {
    if (handleWhichLapWeAreOn("get") == 3) {
        for (let i = 0; i <= handleWhichLapWeAreOn("get"); i++) {
            let Lap = document.getElementById(i);
            let speedAsString = Lap.querySelector(".tdTime").innerText;
            let speed = parseFloat(
                speedAsString.replace(":", "").replace(".", "")
            );
            if (fastestLapElementAndTime.fastestTime == 0) {
                fastestLapElementAndTime.fastestTime = speed;
                Lap.classList.add("lapsTableRowFastest");
                fastestLapElementAndTime.fastestLap = Lap;
            }
            if (fastestLapElementAndTime.fastestTime > speed) {
                fastestLapElementAndTime.fastestTime = speed;
                if (fastestLapElementAndTime.fastestLap != Lap) {
                    fastestLapElementAndTime.fastestLap.classList.remove(
                        "lapsTableRowFastest"
                    );
                    Lap.classList.add("lapsTableRowFastest");
                    fastestLapElementAndTime.fastestLap = Lap;
                }
            }
            if (slowestLapElementAndTime.slowestTime == 0) {
                slowestLapElementAndTime.slowestTime = speed;
                Lap.classList.add("lapsTableRowSlowest");
                slowestLapElementAndTime.slowestLap = Lap;
            }
            if (speed > slowestLapElementAndTime.slowestTime) {
                slowestLapElementAndTime.slowestTime = speed;
                if (slowestLapElementAndTime.slowestLap != Lap) {
                    slowestLapElementAndTime.slowestLap.classList.remove(
                        "lapsTableRowSlowest"
                    );
                    Lap.classList.add("lapsTableRowSlowest");
                    slowestLapElementAndTime.slowestLap = Lap;
                }
            }
        }
    } else if (handleWhichLapWeAreOn("get") > 3) {
        let Lap = document.getElementById(handleWhichLapWeAreOn("get"));
        let speedAsString = Lap.querySelector(".tdTime").innerText;
        let speed = parseFloat(speedAsString.replace(":", "").replace(".", ""));
        if (fastestLapElementAndTime.fastestTime > speed) {
            fastestLapElementAndTime.fastestTime = speed;
            if (fastestLapElementAndTime.fastestLap != Lap) {
                fastestLapElementAndTime.fastestLap.classList.remove(
                    "lapsTableRowFastest"
                );
                Lap.classList.add("lapsTableRowFastest");
                fastestLapElementAndTime.fastestLap = Lap;
            }
        }
        if (speed > slowestLapElementAndTime.slowestTime) {
            slowestLapElementAndTime.slowestTime = speed;
            if (slowestLapElementAndTime.slowestLap != Lap) {
                slowestLapElementAndTime.slowestLap.classList.remove(
                    "lapsTableRowSlowest"
                );
                Lap.classList.add("lapsTableRowSlowest");
                slowestLapElementAndTime.slowestLap = Lap;
            }
        }
    }
}
