var socket;

function updateScoreboard(data) {
    document.getElementById('homeTeam').innerText = data.homeTeam;
    document.getElementById('awayTeam').innerText = data.awayTeam;
    document.getElementById('homeScore').innerText = data.homeScore.toString().padStart(2, '0');
    document.getElementById('awayScore').innerText = data.awayScore.toString().padStart(2, '0');
    document.getElementById('time').innerText = data.time;
    document.getElementById('period').innerText = 'PÉRIODE ' + data.period;

    // Animation pour les mises à jour du score
    document.getElementById('homeScore').classList.add('score-update');
    document.getElementById('awayScore').classList.add('score-update');
    setTimeout(() => {
        document.getElementById('homeScore').classList.remove('score-update');
        document.getElementById('awayScore').classList.remove('score-update');
    }, 1000);

    // Jouer un son pour les buts marqués
    if (data.goalScored) {
        var audio = new Audio('goal-sound.mp3');
        audio.play();
    }
}

function connectWebSocket() {
    socket = new WebSocket('ws://localhost:8080');
    socket.onopen = function() {
        console.log('Connecté au serveur WebSocket');
    };
    socket.onmessage = function(event) {
        var data = JSON.parse(event.data);
        updateScoreboard(data);
    };
    socket.onclose = function() {
        console.log('Déconnecté du serveur WebSocket');
        setTimeout(connectWebSocket, 5000); // Reconnexion après 5 secondes
    };
    socket.onerror = function(error) {
        console.error('Erreur WebSocket : ', error);
    };
}

connectWebSocket();