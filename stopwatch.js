
let time;
let interval;
let fastest = 0;
let fastestLap = 0;
let slowest = 0;
let slowestLap = 0;
let lastLapTime = 0;
let newLaptime = 0;
let whichLap = 0;
let displayTime = 0;
let convertedPreviousTimeObj = { minutes:0, seconds:0, centiseconds:0 }
let rawPreviousTimeObj = { centiseconds:0 }
let convertedCurrentTimeObj = { minutes:0, seconds:0, centiseconds:0 }
let rawCurrentTimeObj = { centiseconds:0 }
let rawPausedTimeObj = { centiseconds:0 }
//Feature List
//Track fastest and slowest lap
//Make latest lap realtime
//Fix bug with time not starting where it left off when paused

//Function to count the time
function timeCounter(){
    let startTime=Date.now()
    interval = setInterval(function(){
        let currentTime = Date.now();
        rawCurrentTimeObj.centiseconds = currentTime - startTime;
        rawCurrentTimeObj.centiseconds += rawPausedTimeObj.centiseconds
        convertBack(rawCurrentTimeObj.centiseconds)
        document.getElementById("timer").innerHTML = Formatter(convertedCurrentTimeObj.minutes,convertedCurrentTimeObj.seconds,convertedCurrentTimeObj.centiseconds)
    },10)
}

//Handle Clearing interval
function stopTimer(){
    rawPausedTimeObj.centiseconds = rawCurrentTimeObj.centiseconds
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
    rawCurrentTimeObj.centiseconds = 0;
    rawPausedTimeObj.centiseconds = 0;
    fastest = 0;
    slowest = 0;
    whichLap = 0 
    let current_list = document.querySelectorAll("tr")
    for (let i = 0; (tr = current_list[i]); i++) {
        tr.parentNode.removeChild(tr);
    }
    document.getElementById("timer").innerHTML = '00:00.00'
}

//this function is responsible for adding the html with the laps time and keeping track of the whichLap variable
// It calls "lapCalc" to begin calculations got laps
function lapTracker(){
    //Setting tr Information
    let tr = document.createElement('tr');
    tr.setAttribute('class','lapsTableRow');
    tr.setAttribute('id',whichLap);

    //Setting tdLap Information
    let tdLap = document.createElement('td');
    tdLap.setAttribute('class','tdLap')
    tdLap.innerHTML = (`Lap ${whichLap + 1}`)
    
    //Setting tdTime Information
    let tdTime = document.createElement('td');
    tdTime.setAttribute('class','tdTime')
    tdTime.innerHTML = (lapCalc(rawCurrentTimeObj.centiseconds))

    if(whichLap == 0){
        //Applying table row
        document.querySelector('table').appendChild(tr);
    }else{
    //Applying table row
    document.getElementById(whichLap - 1).insertAdjacentElement('beforebegin',tr)
    }
    //Applying tdLap Information
    tr.appendChild(tdLap);

     //Applying tdLap Information
    tr.appendChild(tdTime);
    //Add to whichLap for tracking
    if (whichLap == 2){
        findSlowAndFast()
    }else if(whichLap > 2){
        findSlowAndFast()
    }
    whichLap++
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
    convertedBackdisplayTime = convertBack(displayTime)
    time = LapFormatter(convertedCurrentTimeObj.minutes,convertedCurrentTimeObj.seconds,convertedCurrentTimeObj.centiseconds)
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

function findSlowAndFast(){
    if(whichLap == 2){
        for(let i = 0; i <= whichLap; i++){
            let Lap = document.getElementById(i)
            let speedAsString = (Lap.querySelector('.tdTime')).innerHTML
            let speed = parseFloat(speedAsString.replace(':','').replace('.',''))
            if (fastest == 0){
                fastest = speed
                Lap.classList.add('lapsTableRowFastest')
                fastestLap = Lap
            }
            if(fastest > speed){
                fastest = speed
                if(fastestLap != Lap){
                    fastestLap.classList.remove('lapsTableRowFastest')
                    Lap.classList.add('lapsTableRowFastest')
                    fastestLap = Lap
                }
            }
            if(slowest ==  0){
                slowest = speed
                Lap.classList.add('lapsTableRowSlowest')
                slowestLap =  Lap
                
            }
            if(speed > slowest){
                slowest = speed
                if(slowestLap != Lap){
                    slowestLap.classList.remove('lapsTableRowSlowest')
                    Lap.classList.add('lapsTableRowSlowest')
                    slowestLap = Lap
                }
                
            }
        }  
    }else{
        let Lap = document.getElementById(whichLap)
        let speedAsString = (Lap.querySelector('.tdTime')).innerHTML
        let speed = parseFloat(speedAsString.replace(':','').replace('.',''))
        if(fastest > speed){
            fastest = speed
            if(fastestLap != Lap){
                fastestLap.classList.remove('lapsTableRowFastest')
                Lap.classList.add('lapsTableRowFastest')
                fastestLap = Lap
            }
        }
        if(speed > slowest){
            slowest = speed
            if(slowestLap != Lap){
                slowestLap.classList.remove('lapsTableRowSlowest')
                Lap.classList.add('lapsTableRowSlowest')
                slowestLap = Lap
            }
            
        }
    }
}