const socket = io();
const playerForm = document.getElementById("playerForm");
const playerInfoDiv = document.getElementById("player-info");
const heatmapContainerDiv = document.getElementById("heatmap-container");
const infoBpm = document.getElementById("info-bpm");
const infoVelocidade = document.getElementById("info-velocidade");
const infoNome = document.getElementById("info-nome");
const selectLiga = document.getElementById("liga");
const selectTime = document.getElementById("time");
const selectJogo = document.getElementById("jogo");
const selectJogador = document.getElementById("jogador");
const canvas = document.getElementById("heatmapCanvas");
const ctx = canvas.getContext("2d");
const imageWidth = 612;
const imageHeight = 453;
const fieldWidth = 100;
const fieldHeight = (fieldWidth / imageWidth) * imageHeight;

canvas.width = imageWidth; 
canvas.height = imageHeight;

const heatmap = simpleheat('heatmapCanvas');
heatmap.max(100).radius(25, 15);

let heatPoints = [];
let allPlayersData = [];

function processPlayerData(data) {
    infoBpm.textContent = `${data.bpm} bpm`;
    infoVelocidade.textContent = `${data.velocidade} km/h`;

    const x = (data.posicao_x / fieldWidth) * canvas.width;
    const y = (data.posicao_y / fieldHeight) * canvas.height;
    
    heatPoints.push([x, y, 100]);
    
    if (heatPoints.length > 500) {
        heatPoints.shift();
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    heatmap.data(heatPoints).draw();
}

function startTracking(query) {
    heatPoints = [];
    heatmap.clear();
    playerInfoDiv.style.display = "block";
    heatmapContainerDiv.style.display = "block";
    infoNome.textContent = query.jogador;
    
    socket.emit("searchPlayer", query);
}

function populateDropdown(select, options) {
    clearDropdown(select);
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.textContent = optionText;
        option.value = optionText;
        select.appendChild(option);
    });
}

function clearDropdown(select) {
    select.innerHTML = '<option value="">Selecione...</option>';
}

socket.on("playersData", (data) => {
    allPlayersData = data;
    const ligas = [...new Set(allPlayersData.map(p => p.liga))];
    populateDropdown(selectLiga, ligas);
});

selectLiga.addEventListener('change', () => {
    const selectedLiga = selectLiga.value;
    const times = [...new Set(allPlayersData.filter(p => p.liga === selectedLiga).map(p => p.time))];
    populateDropdown(selectTime, times);
    clearDropdown(selectJogo);
    clearDropdown(selectJogador);
});

selectTime.addEventListener('change', () => {
    const selectedLiga = selectLiga.value;
    const selectedTime = selectTime.value;
    const jogos = [...new Set(allPlayersData.filter(p => p.liga === selectedLiga && p.time === selectedTime).map(p => p.jogo))];
    populateDropdown(selectJogo, jogos);
    clearDropdown(selectJogador);
});

selectJogo.addEventListener('change', () => {
    const selectedLiga = selectLiga.value;
    const selectedTime = selectTime.value;
    const selectedJogo = selectJogo.value;
    const jogadores = [...new Set(allPlayersData.filter(p => p.liga === selectedLiga && p.time === selectedTime && p.jogo === selectedJogo).map(p => p.jogador))];
    populateDropdown(selectJogador, jogadores);
});

playerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const query = {
        liga: selectLiga.value,
        time: selectTime.value,
        jogo: selectJogo.value,
        jogador: selectJogador.value
    };

    startTracking(query);
});

socket.on("playerData", (data) => {
    processPlayerData(data);
});

socket.on("playerNotFound", (message) => {
    alert(message);
    playerInfoDiv.style.display = "none";
    heatmapContainerDiv.style.display = "none";
});

ctx.clearRect(0, 0, canvas.width, canvas.height);