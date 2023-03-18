const mongoose = require('mongoose');

const { MONGO_URI } = process.env;
const database = 'pinger';
const connectToMongo = () => {
    
    mongoose.connect(`${MONGO_URI}/${database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log('Connected to MongoDB'));
};

module.exports = connectToMongo;