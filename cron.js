const cron = require('node-cron');
const axios = require('axios');

const Ping = require("./models/ping");

function scheduleCronJob(duration, callback, ...args) {
    cron.schedule(duration, () => {
        callback(...args);
    });
}   


module.exports = {
    run : async () => {
        // run every minute
        // scheduleCronJob('*/1 * * * *', async () => {
        //     try{
        //         const pings = await Ping.find();
        //         pings.forEach(async ping => {
        //             axios.get(ping.url).then(response => {
        //                 console.log(response.status);
        //             }).catch(error => {
        //                 console.log(error.message);
        //             });
        //         });
        //     }catch(error){
        //         console.log(error.message);
        //     }
        // }); 

        try{
            const pings = await Ping.find();
            pings.forEach(ping => {
                scheduleCronJob(`*/${ping.interval} * * * *`, () => {
                    axios.get(ping.url).then(response => {
                        console.log(ping.name + " "+ response.status);
                    }).catch(error => {
                        console.log(ping.name + " "+error.message);
                    });
                });
            });
        }catch(error){
            console.log(error.message);
        }

    },

    addToSchedule: async (ping) =>{
        scheduleCronJob(`*/${ping.interval} * * * *`, () => {
            axios.get(ping.url).then(response => {
                console.log(ping.name + " "+ response.status);
            }).catch(error => {
                console.log(ping.name + " "+error.message);
            });
        });
    }
};