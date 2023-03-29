const cron = require('node-cron');
const axios = require('axios');

const Ping = require("./models/ping");



function minToAst(min){
    let  m, h, d, M, w;
    m = min % 60;
    h = Math.floor(min / 60) % 24;
    d = Math.floor(min / 60 / 24) % 30;
    M = Math.floor(min / 60 / 24 / 30) % 12;
    w = "*"

    m = m == 0 ? "*": `*/${m}`;
    h = h == 0 ? "*": `*/${h}`;
    d = d == 0 ? "*": `*/${d}`;
    M = M == 0 ? "*": `*/${M}`;


    return `${m} ${h} ${d} ${M} ${w}`;
}


function scheduleCronJob(duration, callback, ...args) {
    cron.schedule(duration, () => {
        callback(...args);
    });
}   

async function addToSchedule (ping){
    const duration = minToAst(ping.interval);
    console.log(duration);
    scheduleCronJob( duration , () => {
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
                // console.log(ping)
            });
        }catch(error){
            console.log(error.message);
        }

    },

    addToSchedule
    
};

