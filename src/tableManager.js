import { handleWhichLapWeAreOn, handleLiveLap } from './utils.js'
import { lapTimeCalculator } from './lapLogic.js'
import { findSlowAndFast } from './lapLogic.js'

export let $tableRowWithLiveLapTime = undefined

export function createAndHandleLiveLapTime() {
	let liveTableRowLapData = document.createElement('div')
	let liveTdLap = document.createElement('div')
	let liveTdTime = document.createElement('div')
	if (!handleLiveLap('getStatusOfLiveLapInitializated')) {
		liveTableRowLapData.setAttribute('class', 'flexLapRow')
		liveTableRowLapData.setAttribute('live-table-data-id', 'liveTableRowLapData')
		liveTdTime.setAttribute('class', 'flexTime')
		liveTdLap.setAttribute('live-table-data-id', 'liveTdLap')
		liveTdLap.setAttribute('class', 'flexLap')
		document.querySelector('[data-id=stopWatchLaps]').insertAdjacentElement('afterbegin', liveTableRowLapData)
		liveTableRowLapData.appendChild(liveTdLap)
		liveTableRowLapData.appendChild(liveTdTime)
		$tableRowWithLiveLapTime = liveTdTime
		document.querySelector('[table-data-id]') ? document.querySelector('[table-data-id]').remove() : null
		handleLiveLap('setStatusLiveLapInitializatedToTrue')
	}
	document.querySelector('[live-table-data-id=liveTdLap]').innerText = `Lap ${handleWhichLapWeAreOn('get') + 1}`
}

export function createTables() {
	//Setting tr Information
	let tableRowLapData = document.createElement('div')
	tableRowLapData.setAttribute('class', 'flexLapRow')
	tableRowLapData.setAttribute('id', handleWhichLapWeAreOn('get'))

	//Setting tdLap Information
	let tdLap = document.createElement('div')
	tdLap.setAttribute('class', 'flexLap')
	tdLap.innerText = `Lap ${handleWhichLapWeAreOn('get') + 1}`

	//Setting tdTime Information
	let tdTime = document.createElement('div')
	tdTime.setAttribute('class', 'flexTime')
	tdTime.innerText = lapTimeCalculator()

	handleWhichLapWeAreOn('get') == 0
		? document
				.querySelector('[live-table-data-id=liveTableRowLapData]')
				.insertAdjacentElement('afterend', tableRowLapData)
		: document
				.getElementById(handleWhichLapWeAreOn('get') - 1)
				.insertAdjacentElement('beforebegin', tableRowLapData)

	//Applying tdLap and tdTime Information
	tableRowLapData.appendChild(tdLap)
	tableRowLapData.appendChild(tdTime)

	document.querySelector('[table-data-id]') ? document.querySelector('[table-data-id]').remove() : null

	//Maintence Functions

	findSlowAndFast()
	handleWhichLapWeAreOn('increment')
	createAndHandleLiveLapTime()
}

export function createInvisibleTable() {
	//Setting tr Information
	for (let i = 0; i <= 8; i++) {
		//Setting tr Information
		let tableRowLapData = document.createElement('div')
		tableRowLapData.setAttribute('class', 'flexLapRow')
		tableRowLapData.setAttribute('table-data-id', i)

		//Setting tdLap Information
		let tdLap = document.createElement('div')
		tdLap.setAttribute('class', 'flexLap')

		//Setting tdTime Information
		let tdTime = document.createElement('div')
		tdTime.setAttribute('class', 'flexTime')

		i == 0
			? document.querySelector('[data-id=stopWatchLaps]').appendChild(tableRowLapData)
			: document.querySelector('[table-data-id]').insertAdjacentElement('beforebegin', tableRowLapData)
		//Applying tdLap Information
		tableRowLapData.appendChild(tdLap)
		tableRowLapData.appendChild(tdTime)
	}
}
