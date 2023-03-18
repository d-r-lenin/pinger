const cron = require('node-cron');


function scheduleCronJob(duration, callback, ...args) {
    cron.schedule(duration, () => {
        callback(...args);
    });
}   

// run every minute
scheduleCronJob('*/1 * * * *', () => {
    
});

module.exports = scheduleCronJob;