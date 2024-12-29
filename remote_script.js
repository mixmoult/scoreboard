var socket = new WebSocket('ws://localhost:8080');

socket.onopen = function() {
    console.log('Connecté au serveur WebSocket');
};

socket.onerror = function(error) {
    console.error('Erreur WebSocket : ', error);
};

function sendCommand(command) {
    socket.send(JSON.stringify(command));
}

function incrementScore(team) {
    sendCommand({ type: 'incrementScore', team: team });
}

function decrementScore(team) {
    sendCommand({ type: 'decrementScore', team: team });
}

function startStopTime() {
    sendCommand({ type: 'startStopTime' });
}

function resetTime() {
    sendCommand({ type: 'resetTime' });
}

function nextPeriod() {
    sendCommand({ type: 'nextPeriod' });
}

function previousPeriod() {
    sendCommand({ type: 'previousPeriod' });
}

function setPeriodDuration() {
    const duration = document.getElementById('periodDuration').value;
    if (duration) {
        sendCommand({ type: 'setPeriodDuration', duration: parseInt(duration) });
    }
}