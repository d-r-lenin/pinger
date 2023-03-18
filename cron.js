const cron = require('node-cron');
const axios = require('axios');

const Ping = require("./models/ping");

function scheduleCronJob(duration, callback, ...args) {
    cron.schedule(duration, () => {
        callback(...args);
    });
}   


module.exports = {
    run : () => {
        // run every minute
        scheduleCronJob('*/1 * * * *', async () => {
            try{
                const pings = await Ping.find();
                pings.forEach(async ping => {
                    axios.get(ping.url).then(response => {
                        console.log(response.status);
                    }).catch(error => {
                        console.log(error.message);
                    });
                });
            }catch(error){
                console.log(error.message);
            }
        }); 

    }
};