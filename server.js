const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

let scoreboardData = {
    homeTeam: 'LOCAUX',
    awayTeam: 'VISITEURS',
    homeScore: 0,
    awayScore: 0,
    time: '00:00',
    period: 1,
    goalScored: false
};

wss.on('connection', (ws) => {
    ws.send(JSON.stringify(scoreboardData));

    ws.on('message', (message) => {
        const command = JSON.parse(message);
        switch (command.type) {
            case 'incrementScore':
                scoreboardData[`${command.team}Score`]++;
                scoreboardData.goalScored = true;
                break;
            case 'decrementScore':
                if (scoreboardData[`${command.team}Score`] > 0) {
                    scoreboardData[`${command.team}Score`]--;
                }
                break;
            case 'startStopTime':
                // Implémentez la logique du timer ici
                break;
            case 'resetTime':
                scoreboardData.time = '00:00';
                break;
            case 'nextPeriod':
                scoreboardData.period++;
                break;
            case 'previousPeriod':
                if (scoreboardData.period > 1) {
                    scoreboardData.period--;
                }
                break;
            case 'setPeriodDuration':
                // Implémentez la logique pour définir la durée de la période
                break;
        }
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(scoreboardData));
            }
        });
        scoreboardData.goalScored = false;
    });
});

app.use(express.static(path.join(__dirname, 'public')));

server.listen(8080, () => {
    console.log('Serveur en écoute sur http://localhost:8080');
});