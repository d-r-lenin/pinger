const {Schema, model} = require('mongoose');

const pingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    interval: {
        type: Number,
        required: true
    }
});

const Ping = model('Ping', pingSchema, 'pings');

module.exports = Ping;