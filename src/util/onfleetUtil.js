const request = require('request');

async function getAllWorkers() {
    const options = {
        'method': 'GET',
        'url': `${process.env.ONFLEET_BASE_URL}/workers`,
        'headers': {
            'Authorization': `Basic ${process.env.ONFLEET_API_KEY}`,
            'Content-Type': 'application/json'
        }
    };
    console.log(`getWorker options: ${JSON.stringify(options)}`)
    return new Promise(function (resolve, reject) {
        request(options, function (error, response) {
            if (error) {
                console.error('getWorker', error)
                resolve({status: false, body: error});
            } else {
                console.log(`getWorker - ${response.body}`);
                if (response.statusCode === 200) {
                    const body = JSON.parse(response.body);
                    resolve({status: true, body});
                } else {
                    resolve({status: false, body: JSON.parse(response.body)});
                }
            }
        });
    })
}

async function setWorkerSchedule(workerId, schedule) {
    const options = {
        'method': 'POST',
        'url': `${process.env.ONFLEET_BASE_URL}/workers/${workerId}/schedule`,
        'headers': {
            'Authorization': `Basic ${process.env.ONFLEET_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(schedule)
    };
    console.log(`setWorkerSchedule options: ${JSON.stringify(options)}`)
    return new Promise(function (resolve, reject) {
        request(options, function (error, response) {
            if (error) {
                console.error('setWorkerSchedule', error)
                resolve({status: false, body: error});
            } else {
                console.log(`setWorkerSchedule - ${response.body}`);
                if (response.statusCode === 200) {
                    const body = JSON.parse(response.body);
                    resolve({status: true, body});
                } else {
                    resolve({status: false, body: JSON.parse(response.body)});
                }
            }
        });
    })
}

module.exports = {getAllWorkers, setWorkerSchedule}
