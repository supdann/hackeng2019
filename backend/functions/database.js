// Import the Firebase base SDK.
const firebase = require('firebase/app');
require('firebase/database');

// We initialize Firebase using a client-side config.
const firebaseConfig = require('./firebase-config.json').result;
(firebase.default || firebase).initializeApp(firebaseConfig);


// Get and return all employees
// async function getAllEmployees() {
// 	const snap = await firebase.database().ref('/employees').orderByChild('level').once('value');
// 	return { employees: snap.val() };
// }

// // Get and return an employee by their id number
// // also fetch all of the employee's direct reports (if any)
// async function getEmployeeById(employeeId) {
// 	let employee;
// 	const snap = await firebase.database().ref(`/employees/${employeeId}`).once('value');
// 	employee = snap.val();
// 	const reportIds = Object.keys(employee.reports || []);
// 	const getReports = reportIds.map(userId => firebase.database().ref(`/employees/${userId}`).once('value'));
// 	const reportSnapshots = await Promise.all(getReports);
// 	reports = reportSnapshots.map(snap => snap.val());
// 	return { employee, reports: reports };
// }

async function insertNewEntry( engineID, data) {
	const dbRef = firebase.database().ref('/engines')
	var engineRef = dbRef.child(engineID)
	await engineRef.push(data)
}

async function getEnginesList() {
	let engines
	try {
		const snap = await firebase.database().ref(`/engines`)
		console.log(snap)
		engines = snap.val()
	}catch (e){
		throw e
	}

	return { engines }
}

async function getServerTime(){
	try {
		return await firebase.database.ServerValue.TIMESTAMP
	}catch (e){
		throw e
	}
}

async function getEngineDataByID(engineID) {
	let engine

	const snap = await firebase.database().ref(`/engines/${engineID}`).once('value')
	engine = snap.val()

	// const reportIds = Object.keys(employee.reports || [])
	// const getReports = reportIds.map(userId => firebase.database().ref(`/employees/${userId}`).once('value'))
	// const reportSnapshots = await Promise.all(getReports)
	// reports = reportSnapshots.map(snap => snap.val())

	return { engine };
}

module.exports = {
	getServerTime,
	getEnginesList,
	insertNewEntry,
	getEngineDataByID
	// getAllEmployees,
	// getEmployeeById,
};