
let interval;
let microseconds = 0;
let seconds = 0;
let minutes = 0;
let whichLap = 0;
let lastConvertedtime = 0;
let previousConvertedtime = 0;
let currentConvertedtime = 0;
let displayTime = 0;
let currentMicrosecond = 0;
let smallest = 0;
let largest = 0;
let convertedBackminutes = 0;
let convertedBackseconds = 0;
let convertedBackmicroseconds= 0;
let time;

//timeCounter for using setInterval to 
function timeCounter(){
    interval = setInterval(function(){
        microseconds ++
        if (microseconds == 100){
            microseconds = 0
            seconds ++
        } 
        if(seconds == 60 ){
            seconds = 0
            minutes++
        }
        document.getElementById("timer").innerHTML = Formatter(minutes,seconds,microseconds)
    },10)
}

function stopTimer(){
    clearInterval(interval)
}

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
function resetLap(){
    resetLapButton = document.getElementById('resetLap')
    resetLaptext = resetLapButton.innerText
    if (resetLaptext ==="Reset"){
        resetValues()
    }
    else if(resetLaptext === "Lap"){
        lapTracker(minutes,seconds,microseconds)
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
// It calls "lastValueCalc" to begin calculations got laps
function lapTracker(minutes,seconds,microseconds){
    if(whichLap ==0){
        lastValueCalc(minutes,seconds,microseconds)
        var node = document.createElement('li');
        node.setAttribute('id',whichLap)
        document.querySelector('ul').appendChild(node);
        node.appendChild(document.createTextNode(`Lap ${whichLap + 1}   `+ lastValueCalc(minutes,seconds,microseconds)));
        document.querySelector('ul').appendChild(node);
        node.appendChild(document.createElement('hr'));
        whichLap++
    }else{
    var node = document.createElement('li');
    node.setAttribute('id',whichLap)
    node.appendChild(document.createTextNode(`Lap ${whichLap + 1}    `+ lastValueCalc(minutes,seconds,microseconds)));
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
function lastValueCalc(minutes,seconds,microseconds){
    if(whichLap == 0){
        lastConvertedtime = conversion(minutes,seconds,microseconds)
        displayTime = lastConvertedtime
    }else{
        newConvertedtime = conversion(minutes,seconds,microseconds)
        displayTime = (newConvertedtime - lastConvertedtime)
        lastConvertedtime = newConvertedtime
    }
    console.log(displayTime)
    convertedBackdisplayTime = convertBack(displayTime)
    time = LapFormatter(convertedBackminutes,convertedBackseconds,convertedBackmicroseconds)
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
    convertedBackminutes = Math.floor(convertedTime / 6000)
        convertedTime -= convertedBackminutes * 6000;
    convertedBackseconds = Math.floor(convertedTime / 100);
        convertedTime -= convertedBackseconds * 100;
    convertedBackmicroseconds = convertedTime;
}
//Function to Format Stopwatch time
function Formatter(){
    let formattedMicroseconds = microseconds.toString().padStart(2,"0")
    let formattedSeconds = seconds.toString().padStart(2,"0")
    let formattedMinutes = minutes.toString().padStart(2,"0")

return(`${formattedMinutes}:${formattedSeconds}.${formattedMicroseconds}`)
}
//Function to Format Laps 
function LapFormatter(){
    let formattedMicroseconds = convertedBackmicroseconds.toString().padStart(2,"0")
    let formattedSeconds = convertedBackseconds.toString().padStart(2,"0")
    let formattedMinutes = convertedBackminutes.toString().padStart(2,"0")

return(`${formattedMinutes}:${formattedSeconds}.${formattedMicroseconds}`)
}