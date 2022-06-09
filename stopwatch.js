let displayTime = 0;
let smallest = 0;
let largest = 0;
let time;
let interval;
let whichLap = 0;
let lastLapTime = 0;
let newLaptime = 0;
let convertedPreviousTimeObj = { minutes:0, seconds:0, centiseconds:0 }
let rawPreviousTimeObj = { centiseconds:0 }
let convertedCurrentTimeObj = { minutes:0, seconds:0, centiseconds:0 }
let rawCurrentTimeObj = { centiseconds:0 }

//Function to count the time
function timeCounter(){
    let startTime=Date.now()
    interval = setInterval(function(){
        let currentTime = Date.now();
        rawCurrentTimeObj.centiseconds = currentTime - startTime;
        //console.log(rawCurrentTimeObj.centiseconds)
        convertBack(rawCurrentTimeObj.centiseconds)
        document.getElementById("timer").innerHTML = Formatter(convertedCurrentTimeObj.minutes,convertedCurrentTimeObj.seconds,convertedCurrentTimeObj.centiseconds)
    },10)
}

//Handle Clearing interval
function stopTimer(){
    clearInterval(interval)
}

//Handle startStop Button Function
function startStop(){
    startStopButton = document.getElementById('startStop')
    startStoptext = startStopButton.innerText
    resetLapButton = document.getElementById('resetLap')
    if (startStoptext ==="Stop"){
        startStopButton.className="start"
        startStopButton.innerText = "Start"
        resetLapButton.innerText = "Reset"
        stopTimer()
    }
    else if(startStoptext === "Start"){
        startStopButton.className="stop"
        startStopButton.innerText = "Stop"
        resetLapButton.innerText = "Lap"
        timeCounter();
    } 
}

//Handle resetLap Button Function
function resetLap(){
    resetLapButton = document.getElementById('resetLap')
    resetLaptext = resetLapButton.innerText
    if (resetLaptext ==="Reset"){
        resetValues()
    }
    else if(resetLaptext === "Lap"){
        lapTracker()
    } 
}

//Reset values is called by Reset Lap if the innerhtml says "Reset specifically"
//This will reset minutes seconds and centiseconds to 0 deletes all laps in current app with a for loop
function resetValues(){
    minutes = 0;
    seconds = 0;
    microseconds = 0;
    laps = []
    let current_list = document.querySelectorAll("li")
    console.log(current_list)
    for (let i = 0; (li = current_list[i]); i++) {
        li.parentNode.removeChild(li);
    }
    whichLap = 0 
    document.getElementById("timer").innerHTML = `${0}${minutes}:${0}${seconds}.${0}${microseconds}`
}

//this function is responsible for adding the html with the laps time and keeping track of the whichLap variable
// It calls "lapCalc" to begin calculations got laps
function lapTracker(){
    if(whichLap == 0){
        lapCalc(rawCurrentTimeObj.centiseconds)
        var node = document.createElement('li');
        node.setAttribute('id',whichLap)
        document.querySelector('ul').appendChild(node);
        node.appendChild(document.createTextNode(`Lap ${whichLap + 1}   `+ lapCalc(rawCurrentTimeObj.centiseconds)));
        document.querySelector('ul').appendChild(node);
        node.appendChild(document.createElement('hr'));
        whichLap++
    }else{
    var node = document.createElement('li');
    node.setAttribute('id',whichLap)
    node.appendChild(document.createTextNode(`Lap ${whichLap + 1}    `+ lapCalc(rawCurrentTimeObj.centiseconds)));
    old_id = whichLap - 1
    let old = document.getElementById(old_id)
    console.log(old_id)
    old.insertAdjacentElement('beforebegin',node)
    node.appendChild(document.createElement('hr'));
    whichLap++
    }
}

//Function to Save last value of time (in centiseconds) and subtract to newest time in centiseconds to get elapsed laptime
//This function also converts and replaces the "old" time with the new time after conversion
function lapCalc(){
    if(whichLap == 0){
        lastLapTime = rawCurrentTimeObj.centiseconds
        displayTime = lastLapTime
    }else{
        newLaptime = rawCurrentTimeObj.centiseconds
        displayTime = (newLaptime - lastLapTime)
        lastLapTime = newLaptime
    }
    console.log(displayTime)
    convertedBackdisplayTime = convertBack(displayTime)
    time = LapFormatter(convertedCurrentTimeObj.minutes,convertedCurrentTimeObj.seconds,convertedCurrentTimeObj.centiseconds)
    console.log(time)
    return(time)
}

//Function to convert all values down to centiseconds
function conversion(minutes,seconds,microseconds){
    let minutesToSeconds = minutes * 60;
    let secondsToMicroseconds = (seconds + minutesToSeconds) * 100;
    let convertedMicroseconds = secondsToMicroseconds + microseconds;
    return convertedMicroseconds
}

//Function to convert back to minutes and seconds and centiseconds
function convertBack(convertedTime){
    convertedCurrentTimeObj.minutes = Math.floor(convertedTime / 60000)
        convertedTime -= convertedCurrentTimeObj.minutes * 60000;
    convertedCurrentTimeObj.seconds = Math.floor(convertedTime / 1000);
        convertedTime -= convertedCurrentTimeObj.seconds * 1000;
    convertedCurrentTimeObj.centiseconds = Math.floor((convertedTime)/10);
}

//Function to Format Stopwatch time
function Formatter(minutes,seconds,microseconds){
    let formattedMicroseconds = microseconds.toString().padStart(2,"0")
    let formattedSeconds = seconds.toString().padStart(2,"0")
    let formattedMinutes = minutes.toString().padStart(2,"0")

return(`${formattedMinutes}:${formattedSeconds}.${formattedMicroseconds}`)
}

//Function to Format Laps 
function LapFormatter(minutes,seconds,microseconds){
    let formattedMicroseconds = microseconds.toString().padStart(2,"0")
    let formattedSeconds = seconds.toString().padStart(2,"0")
    let formattedMinutes = minutes.toString().padStart(2,"0")

return(`${formattedMinutes}:${formattedSeconds}.${formattedMicroseconds}`)
}