
let interval;
let microseconds = 0;
let seconds = 0;
let minutes = 0;
let laps = [];

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
        if(microseconds === 0){
            document.getElementById("timer").innerHTML = `${0}${minutes}:${0}${seconds}.${00}`
        }
        else if(microseconds < 10){
            document.getElementById("timer").innerHTML = `${minutes}:${seconds}.${0}${microseconds}`
        }
        else if(seconds < 10){
            document.getElementById("timer").innerHTML = `${0}${minutes}:${0}${seconds}.${microseconds}`
        }
        else if(minutes < 10){
            document.getElementById("timer").innerHTML = `${0}${minutes}:${0}${seconds}.${microseconds}`

        }
        else{
            document.getElementById("timer").innerHTML = `${minutes}:${seconds}.${microseconds}`
        }
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
        lapTracker()
        let TimeObject = {minutes, seconds, microseconds};
        laps.push(TimeObject)
        console.log(laps)
    } 
}
function resetValues(){
    minutes = 0;
    seconds = 0;
    microseconds = 0;
    document.getElementById("timer").innerHTML = `${0}${minutes}:${0}${seconds}.${0}${microseconds}`
}
function lapTracker(){
    console.log('before if' + laps.length)
    if (laps.length >= 0){
        console.log('after if' + laps.length)
        for(let i = laps.length-1; i--; i == 0){
            console.log('value of i ' + i)
            var node = document.createElement('li');
            //node.appendChild(document.createTextNode(laps[i].minutes));
            //node.appendChild(document.createTextNode(laps.map(laps => laps.minutes)));
            //node.appendChild(document.createTextNode(laps[minutes][seconds][microseconds]));
            node.appendChild(document.createTextNode(Object.values(laps[i])));
            document.querySelector('ul').appendChild(node);
        }
    }
}
