let interval;
let liveTime = false;
let lastLapTime = 0;
let whichLap = 0;
let fastestLapElementAndTime = { fastestTime: 0, fastestLap: 0 };
let slowestLapElementAndTime = { slowestTime: 0, slowestLap: 0 };
let formattedCurrentTime = { minutes: 0, seconds: 0, centiseconds: 0 };
let liveLapTime = { minutes: 0, seconds: 0, centiseconds: 0 };
let formattedLiveLapTime = { minutes: 0, seconds: 0, centiseconds: 0 };
let unformattedCurrentTime = { centiseconds: 0 };
let unformattedPausedTime = { centiseconds: 0 };

//Feature List
//Lines for laps need to always be present
//Fix font and styling
//Make responsive

//Function to count the time

const timeCounter = () => {
    let startTime = Date.now();
    interval = setInterval(() => {
        let currentTime = Date.now();
        unformattedCurrentTime.centiseconds = currentTime - startTime;
        unformattedCurrentTime.centiseconds +=
            unformattedPausedTime.centiseconds;
        formatTime(unformattedCurrentTime.centiseconds);
        getLiveLapTime(unformattedCurrentTime.centiseconds);
        document.getElementById("timer").innerText = getFormattedTime();
        document.querySelector(".tdTime").innerText = getFormattedLiveLapTime();
    }, 10);
};

//Handle Clearing interval
const stopTimer = () => {
    unformattedPausedTime.centiseconds = unformattedCurrentTime.centiseconds;
    clearInterval(interval);
};

//TD captialize Stop and start in css
//Handle startStop Button Function
const startStop = () => {
    const start = "Start";
    const stop = "Stop";
    startStopButton = document.getElementById("startStop");
    startStoptext = startStopButton.innerText;
    resetLapButton = document.getElementById("resetLap");
    if (startStoptext === "Stop") {
        startStopButton.className = "start";
        startStopButton.innerText = "Start";
        resetLapButton.innerText = "Reset";
        stopTimer();
    } else if (startStoptext === "Start") {
        startStopButton.className = "stop";
        startStopButton.innerText = "Stop";
        resetLapButton.innerText = "Lap";
        timeCounter();
        initiateLiveTimeTable();
    }
};

//Handle resetLap Button Function
const resetLap = () => {
    resetLapButton = document.getElementById("resetLap");
    resetLaptext = resetLapButton.innerText;
    if (resetLaptext === "Reset") {
        resetValues();
    } else if (resetLaptext === "Lap") {
        lapTracker();
    }
};

//Reset values is called by Reset Lap if the innerhtml says "Reset specifically"
//This will reset minutes seconds and centiseconds to 0 deletes all laps in current app with a for loop
const resetValues = () => {
    unformattedCurrentTime.centiseconds = 0;
    unformattedPausedTime.centiseconds = 0;
    fastestLapElementAndTime.fastestTime = 0;
    slowestLapElementAndTime.slowestTime = 0;
    whichLap = 0;
    liveTime = false;
    let currentList = document.querySelectorAll("tr");
    for (let i = 0; (tr = currentList[i]); i++) {
        tr.parentNode.removeChild(tr);
    }
    createLapsPlaceHolder();
    document.getElementById("timer").innerText = "00:00.00";
};

//this function is responsible for adding the html with the laps time and keeping track of the whichLap variable
// It calls "lapCalc" to begin calculations got laps
const initiateLiveTimeTable = () => {
    if (liveTime === false) {
        lapTracker();
    }
    liveTime = true;
};

const createLapsPlaceHolder = () => {
    //Setting tr Information
    console.log("start");
    for (let i = 0; i <= 8; i++) {
        //Setting tr Information
        let tableRowLapData = document.createElement("tr");
        tableRowLapData.setAttribute("class", "lapsTableRow");
        tableRowLapData.setAttribute("data-id", i);

        //Setting tdLap Information
        let tdLap = document.createElement("td");
        tdLap.setAttribute("class", "tdLap");
        tdLap.setAttribute("class", "invisible");
        tdLap.innerText = "1";

        //Setting tdTime Information
        let tdTime = document.createElement("td");
        tdTime.setAttribute("class", "tdTime");
        tdTime.setAttribute("class", "invisible");
        tdTime.innerText = "1";

        if (i == 0) {
            //Applying table row
            document.querySelector("table").appendChild(tableRowLapData);
        } else {
            //Applying table row
            document
                .querySelector("[data-id]")
                .insertAdjacentElement("beforebegin", tableRowLapData);
        }
        //Applying tdLap Information
        tableRowLapData.appendChild(tdLap);

        //Applying tdLap Information
        tableRowLapData.appendChild(tdTime);
    }
};
//Calls to create Table rows
createLapsPlaceHolder();

const lapTracker = () => {
    //Setting tr Information
    let tableRowLapData = document.createElement("tr");
    tableRowLapData.setAttribute("class", "lapsTableRow");
    tableRowLapData.setAttribute("id", whichLap);

    //Setting tdLap Information
    let tdLap = document.createElement("td");
    tdLap.setAttribute("class", "tdLap");
    tdLap.innerText = `Lap ${whichLap + 1}`;

    //Setting tdTime Information
    let tdTime = document.createElement("td");
    tdTime.setAttribute("class", "tdTime");
    tdTime.innerText = lapCalc();

    if (whichLap == 0) {
        //Applying table row
        document
            .querySelector("table")
            .insertAdjacentElement("afterbegin", tableRowLapData);
    } else {
        //Applying table row
        document
            .getElementById(whichLap - 1)
            .insertAdjacentElement("beforebegin", tableRowLapData);
    }
    //Applying tdLap Information
    tableRowLapData.appendChild(tdLap);

    //Applying tdLap Information
    tableRowLapData.appendChild(tdTime);

    //Add to whichLap for tracking
    if (document.querySelector("[data-id]")) {
        document.querySelector("[data-id]").remove();
    }
    if (whichLap == 2) {
        findSlowAndFast();
    } else if (whichLap > 2) {
        findSlowAndFast();
    }
    whichLap++;
};

//Function to Save last value of time (in centiseconds) and subtract to newest time in centiseconds to get elapsed laptime
//This function also converts and replaces the "old" time with the new time after conversion

const lapCalc = () => {
    let displayTime = 0;
    if (whichLap == 0) {
        lastLapTime = unformattedCurrentTime.centiseconds;
        displayTime = lastLapTime;
    } else {
        displayTime = unformattedCurrentTime.centiseconds - lastLapTime;
        lastLapTime = unformattedCurrentTime.centiseconds;
    }
    formatTime(displayTime);
    return getFormattedTime();
};

//Function to convert back to minutes and seconds and centiseconds
const formatTime = (convertedTime) => {
    formattedCurrentTime.minutes = Math.floor(convertedTime / 60000);
    convertedTime -= formattedCurrentTime.minutes * 60000;
    formattedCurrentTime.seconds = Math.floor(convertedTime / 1000);
    convertedTime -= formattedCurrentTime.seconds * 1000;
    formattedCurrentTime.centiseconds = Math.floor(convertedTime / 10);
};
//Format time from Centiseconds to Minutes, Seconds and Centiseconds
const getFormattedTime = () => {
    let formattedCentiseconds = formattedCurrentTime.centiseconds
        .toString()
        .padStart(2, "0");
    let formattedSeconds = formattedCurrentTime.seconds
        .toString()
        .padStart(2, "0");
    let formattedMinutes = formattedCurrentTime.minutes
        .toString()
        .padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}.${formattedCentiseconds}`;
};
//
const getLiveLapTime = (convertedTime) => {
    formattedLiveLapTime.minutes = Math.floor(
        (convertedTime - lastLapTime) / 60000
    );
    convertedTime -= formattedLiveLapTime.minutes * 60000;
    formattedLiveLapTime.seconds = Math.floor(
        (convertedTime - lastLapTime) / 1000
    );
    convertedTime -= formattedLiveLapTime.seconds * 1000;
    formattedLiveLapTime.centiseconds = Math.floor(
        (convertedTime - lastLapTime) / 10
    );
};
//
const getFormattedLiveLapTime = () => {
    let formattedCentiseconds = formattedLiveLapTime.centiseconds
        .toString()
        .padStart(2, "0");
    let formattedSeconds = formattedLiveLapTime.seconds
        .toString()
        .padStart(2, "0");
    let formattedMinutes = formattedLiveLapTime.minutes
        .toString()
        .padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}.${formattedCentiseconds}`;
};
const findSlowAndFast = () => {
    if (whichLap == 2) {
        for (let i = 0; i <= whichLap; i++) {
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
    } else if (whichLap > 2) {
        let Lap = document.getElementById(whichLap - 1);
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
};
