//First argument will be node command - node
//Second arguments will be Js file name - abc.js
//third arguments will be file path- abc.csv
//forth arguments will be time to execute- 2018-12-09T04:40:53.837

let arguments = process.argv;
let file = arguments[2];
let timeToExecute = arguments[3]
let csvdata = [];

const csvFilePath = file;
const csv = require('csvtojson')
csv()
	.fromFile(csvFilePath)
	.then((jsonObj) => {
		csvdata = jsonObj
		csvdata = csvdata.sort(function (a, b) { return b.priority - a.priority; })

	})

let executeAfterms = new Date(timeToExecute) - new Date()

function executeTask(task) {
	console.log(`Current time: ${new Date()}`, task.event_name, 'priority: ', task.priority)
}

function myFunc() {
	console.log(`started at current time - ${new Date()}`)

	csvdata.forEach(task => {
		let timeoutms = new Date(task.time_to_expire) - new Date();

		setTimeout(executeTask, timeoutms, task);
	})

}

setTimeout(myFunc, executeAfterms);