import { getFormattedTime } from './formatter.js'
import { getCurrentTimeOnTimer } from './timer.js'
import {
	handleAccruedLapTimes,
	handleFastestLapElementAndTime,
	handleSlowestLapElementAndTime,
	handleWhichLapWeAreOn,
} from './utils.js'

let lastLapTime = 0

export function lapTimeCalculator() {
	let previousLapTime = 0
	if (handleWhichLapWeAreOn('get') === 0) {
		lastLapTime = getCurrentTimeOnTimer()
		previousLapTime = lastLapTime
	} else {
		previousLapTime = getCurrentTimeOnTimer() - lastLapTime
		lastLapTime = getCurrentTimeOnTimer()
	}
	handleAccruedLapTimes('add', previousLapTime)
	return getFormattedTime(previousLapTime)
}

export function findSlowAndFast() {
	let $lap = document.getElementById(handleWhichLapWeAreOn('get'))
	let speedAsString = $lap.querySelector('.flexTime').innerText
	let speed = parseFloat(speedAsString.replace(':', '').replace('.', ''))
	if (speed < handleFastestLapElementAndTime('getSpeed') || handleFastestLapElementAndTime('getSpeed') == null) {
		handleFastestLapElementAndTime('getLap') !== null
			? handleFastestLapElementAndTime('getLap').classList.remove('lapsTableRowFastest')
			: null
		handleFastestLapElementAndTime('setSpeedAndLap', $lap, speed)
	}
	if (speed > handleSlowestLapElementAndTime('getSpeed')) {
		handleSlowestLapElementAndTime('getLap') !== null
			? handleSlowestLapElementAndTime('getLap').classList.remove('lapsTableRowSlowest')
			: null
		handleSlowestLapElementAndTime('setSpeedAndLap', $lap, speed)
	}

	if (handleWhichLapWeAreOn('get') >= 2) {
		styleSlowAndFast()
	}
}

function styleSlowAndFast() {
	if (handleWhichLapWeAreOn('get') >= 2) {
		handleSlowestLapElementAndTime('getLap').classList.add('lapsTableRowSlowest')
		handleFastestLapElementAndTime('getLap').classList.add('lapsTableRowFastest')
	}
}
