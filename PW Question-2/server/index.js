const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const poll = express();
const dataFile = path.join(__dirname, "data.json");

//Support posting form data with URL encoded
poll.use(express.urlencoded({ extended: true }));

//Enable CORS
poll.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    next();
});


poll.get('/vote', async (req, res) => {
    let data = JSON.parse(await fs.readFile(dataFile, 'utf-8'));
    const totalVotes = Object.values(data).reduce((total, n) => total += n, 0);

    data = Object.entries(data).map(([label, votes]) => {
        return {
            label,
            percentage: (((100 * votes) / totalVotes) || 0).toFixed(0)
        }
    });

    res.json(data);
});

poll.post('/vote', async (req, res) => {
    const data = JSON.parse(await fs.readFile(dataFile, "utf-8"));

    data[req.body.add]++;

    await fs.writeFile(dataFile, JSON.stringify(data));

    res.end();
});


poll.listen(3000, () => console.log("Server is running on port 3000..."))