import axios from 'axios'

require('dotenv').config()

export default {
	getEngineList() {
		return axios.get(`${process.env.API_URL}/engines/list`)
	},
	getEngineData(id) {
		return axios.get(`http://localhost:5000/alwaystuned2019/us-central1/api/engines/by-id/${id}`)
		// return axios.get(`https://us-central1-alwaystuned2019.cloudfunctions.net/api/engines/by-id/${id}`)
	},
}