import API from './API'

import engine1 from '../engine1.png'
import engine2 from '../engine2.png'
import engine3 from '../engine3.jpg'

// Actions
const LOAD_ENGINE_LIST = `LOAD_ENGINE_LIST`
const LOAD_ENGINE_DATA = `LOAD_ENGINE_DATA`

const SET_LOGGED_IN = `SET_LOGGED_IN`
const SET_LOADING = `SET_LOADING`

// Initial State 
const initialState = {
	engines: [
		{
			engineID: "efioerjhfg9qrufg2",
			image: engine1,
			humidity: null,
			temperature: null,
			pressure: null,
			gases: null
		},
		{
			engineID: "efioerjhfg9qrufg2",
			image: engine2,
			humidity: null,
			temperature: null,
			pressure: null,
			gases: null
		},
		{
			engineID: "efioerjhfg9qrufg2",
			image: engine3,
			humidity: null,
			temperature: null,
			pressure: null,
			gases: null
		}
	],
	displayValues: {
		humidityValues: [],
		temperatureValues: [],
		pressureValues: [],
		gassesValues: [],
	},
	humidityValues: ['', ''],
	temperatureValues: ['', ''],
	pressureValues: ['', ''],
	showMenu: true,	
	loggedIn: true,
	loading: false
}

export default function reducer(state = initialState, action = {}) {
	console.log(state)
	switch (action.type) {
		case LOAD_ENGINE_LIST:
			return {
				...state,
				showMenu: true
			}
		case LOAD_ENGINE_DATA:
			return {
				...state,
				humidityValues: action.humidityPlotData,
				temperatureValues: action.temperaturePlotData,
				pressureValues: action.pressureValues,
				loading: false,
				showMenu: true
			}
		case SET_LOGGED_IN:
			return {
				...state,
				loggedIn: action.loggedIn,
				showMenu: true
			}
		case SET_LOADING:
			return {
				...state,
				loading: true,
				showMenu: false
			}
		default:
			return state
	}
}

// Action Creators

export function loadEngineList(uuid) {
	return dispatch => {
		return new Promise(async (resolve, reject) => {

			dispatch({
				type: LOAD_ENGINE_LIST
			})
			resolve()
		})
	}
}

export function loadEngineData(engineID) {
	return dispatch => {
		return new Promise(async (resolve, reject) => {
			try {
				const response = await API.getEngineData(engineID)
				const humidityPlotData = [['', '']]
				const temperaturePlotData = [['', '']]
				Reflect.ownKeys(response.data).forEach((key, index) => {
					humidityPlotData.push([
						index,
						parseFloat(response.data[key].humidity)
					])
					temperaturePlotData.push([
						index,
						parseFloat(response.data[key].temperature)
					])
				})
				dispatch({
					type: LOAD_ENGINE_DATA,
					humidityPlotData,
					temperaturePlotData
				})
				resolve()
			} catch (e) { reject(e) }
		})
	}
}


export function setLoading() {
	return {
		type: SET_LOADING
	}
}

export function setLoggedIn(loggedIn) {
	return {
		type: SET_LOGGED_IN,
		loggedIn
	}
}