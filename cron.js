const cron = require('node-cron');
const axios = require('axios');

const Ping = require("./models/ping");

function scheduleCronJob(duration, callback, ...args) {
    cron.schedule(duration, () => {
        callback(...args);
    });
}   

async function addToSchedule (ping){
    scheduleCronJob(`*/${ping.interval} * * * *`, () => {
        axios.get(ping.url).then(response => {
            console.log(new Date() + ping.name + " "+ response.status);
        }).catch(error => {
            console.log(new Date() + ping.name + " "+error.message);
        });
    });
}

module.exports = {
    run : async () => {
        

        try{
            const pings = await Ping.find();
            pings.forEach(ping => {
                addToSchedule(ping);
            });
        }catch(error){
            console.log(error.message);
        }

    },

    addToSchedule
    
};