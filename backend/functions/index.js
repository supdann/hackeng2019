const functions = require('firebase-functions');

// Server-side Data Loading
const database = require('./database');

const app = require('express')();
var cors = require('cors')

app.use(cors())


app.post('/engines/by-id/:id?', async (req, res) => {

	try {
		const engineID = req.params.id
		const temperature = req.body.temperature || null
		const humidity = req.body.humidity || null
		const pressure = req.body.pressure || null
		const gasses = req.body.gasses || null
		const timestamp = await database.getServerTime()

		res.set('Cache-Control', 'public, max-age=60, s-maxage=180')
		await database.insertNewEntry(engineID, {
			timestamp,
			temperature,
			humidity,
			pressure,
			gasses
		})
		res.send({ success: true })
	} catch (e) { res.send({ success: false, error: e }) }
})

app.get('/engines/by-id/:id?', async (req, res) => {

	res.set('Cache-Control', 'public, max-age=60, s-maxage=180')

	const engineID = req.params.id

	try {
		const { engine } = await database.getEngineDataByID(engineID)
		res.send(engine)
	} catch (e) { res.send({ success: false, error: e }) }

})

app.get('/engines/list', async (req, res) => {
	res.set('Cache-Control', 'public, max-age=60, s-maxage=180')
	try {
		console.log("engines: "+engines)
		const { engines } = await database.getEnginesList(engineID)
		res.send(engines)
	} catch (e) { res.send({ success: false, error: e }) }

});


exports.api = functions.https.onRequest(app)