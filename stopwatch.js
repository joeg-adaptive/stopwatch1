
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
function conversion(minutes,seconds,microseconds){
    let minutesToSeconds = minutes * 60;
    let secondsToMicroseconds = (seconds + minutesToSeconds) * 100;
    let convertedMicroseconds = secondsToMicroseconds + microseconds;
    return convertedMicroseconds
}
function convertBack(convertedTime){
    convertedBackminutes = Math.floor(convertedTime / 6000)
        convertedTime -= convertedBackminutes * 6000;
    convertedBackseconds = Math.floor(convertedTime / 100);
        convertedTime -= convertedBackseconds * 100;
    convertedBackmicroseconds = convertedTime;
}
function Formatter(){
    let formattedMicroseconds = microseconds.toString().padStart(2,"0")
    let formattedSeconds = seconds.toString().padStart(2,"0")
    let formattedMinutes =minutes.toString().padStart(2,"0")

return(`${formattedMinutes}:${formattedSeconds}.${formattedMicroseconds}`)
}
function LapFormatter(){
    let formattedMicroseconds = convertedBackmicroseconds.toString().padStart(2,"0")
    let formattedSeconds = convertedBackseconds.toString().padStart(2,"0")
    let formattedMinutes = convertedBackminutes.toString().padStart(2,"0")

return(`${formattedMinutes}:${formattedSeconds}.${formattedMicroseconds}`)
}