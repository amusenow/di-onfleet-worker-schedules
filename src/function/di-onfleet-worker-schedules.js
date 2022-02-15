const SnowflakeRepository = require('../lib/SnowflakeRepository');
const onfleetUtil = require('../util/onfleetUtil');
const moment = require('moment-timezone');

const response = function (code, body) {
    return {
        statusCode: code,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}

module.exports.handler = async function (event, context, callback) {

    let {status, value} = await isValidInput();

    if (status) {
        const result = await SnowflakeRepository.executeQuery(`SELECT * From VW_ATTENDANCE_TODAY`)
        const {status, body: allWorkers} = await onfleetUtil.getAllWorkers();
        const workerMap = getWorkerMap(allWorkers);
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const empId = item.EMPLOYEE_ID;
            const SCHEDULED_TIME_IN = item.SCHEDULED_TIME_IN;
            const SCHEDULED_TIME_OUT = item.SCHEDULED_TIME_OUT;
            const workerDetails = workerMap[empId];
            if (workerDetails) {
                const start = moment.tz(SCHEDULED_TIME_IN, 'HH:mm:ss', "America/Los_Angeles").valueOf()
                const end = moment.tz(SCHEDULED_TIME_OUT, 'HH:mm:ss', "America/Los_Angeles").valueOf()
                const schedule = {
                    "entries": [
                        {
                            "date": moment().tz("America/Los_Angeles").format("YYYY-MM-DD"),
                            "shifts": [[start, end]],
                            "timezone": "America/Los_Angeles"
                        }
                    ]
                }
                console.log(`Setting schedule for worker ${workerDetails.id} ${JSON.stringify(schedule)}`)
                await onfleetUtil.setWorkerSchedule(workerDetails.id, schedule)
            }
        }
    }

    context.succeed(response(200, value));
}


async function isValidInput() {
    return {status: true, value: ''}
}

function getWorkerMap(allWorkers) {
    const map = {};
    for (let i = 0; i < allWorkers.length; i++) {
        const metadata = allWorkers[i].metadata;
        for (let j = 0; j < metadata.length; j++) {
            const item = metadata[j];
            const name = item.name;
            const value = item.value;
            if (name === 'Employee id') {
                map[value] = allWorkers[i];
                break;
            }
        }
    }
    return map;
}
