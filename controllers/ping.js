const express = require('express');
const router = express.Router();

const Ping = require('../models/ping');

const { addToSchedule } = require('../cron.js');

router.post('/add', async(req, res) => {
    try {
        const { name, url, interval } = req.body;
        console.log({ name, url, interval });
        const ping = new Ping({
            name,
            url,
            interval
        });
        await ping.save()
        addToSchedule(ping);
        res.status(200).json({
            message: 'Ping added',
            status: 200
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            status: 500
        });
    }
});

router.get('/all', async (req, res) => {
    try {
        const pings = await Ping.find();
        res.status(200).json({
            message: 'Pings fetched',
            status: 200,
            pings 
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            status: 500
        });
    }
});

router.get('/', (req, res) => {
    res.json({
        message: 'pong',
        status: 200
    });
});

module.exports = router;