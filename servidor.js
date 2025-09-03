// Atividade prática

// Simular sensores em jogadores de futebol que enviam dados de:
// Batimentos cardíacos (bpm)
// Velocidade (km/h)
// Posição no campo (x,y)

// Os dados são transmitidos pelo servidor via socket.io para os clientes em tempo real.
// Cada 'room' é um jogador rastreado.

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const fs = require("fs");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let playersData = [];
let playerPositions = {};
const csvFilePath = path.join(__dirname, "players.csv");

function loadPlayersData() {
    fs.readFile(csvFilePath, "utf8", (err, data) => {
        if (err) {
            console.error("Erro ao ler o arquivo CSV:", err);
            return;
        }

        const lines = data.split(/\r?\n/).filter(line => line.trim() !== '');
        const headers = lines[0].split(',');

        playersData = lines.slice(1).map(line => {
            const values = line.split(',');
            const player = {};
            headers.forEach((header, i) => {
                player[header.trim()] = values[i].trim();
            });
            return player;
        });

        console.log("Dados dos jogadores carregados com sucesso.");
    });
}

loadPlayersData();

io.on("connection", (socket) => {
    console.log(`Novo cliente conectado: ${socket.id}`);

    socket.emit("playersData", playersData);

    socket.on("searchPlayer", (query) => {
        const { liga, time, jogo, jogador } = query;

        const foundPlayer = playersData.find(p =>
            p.liga === liga &&
            p.time === time &&
            p.jogo === jogo &&
            p.jogador === jogador
        );

        if (foundPlayer) {
            if (!playerPositions[foundPlayer.jogador]) {
                playerPositions[foundPlayer.jogador] = {
                    x: parseFloat(foundPlayer.posicao_x),
                    y: parseFloat(foundPlayer.posicao_y)
                };
            }

            socket.join(foundPlayer.jogador);
            console.log(`Cliente ${socket.id} entrou na sala do jogador ${foundPlayer.jogador}`);

            const intervalId = setInterval(() => {
                let currentPos = playerPositions[foundPlayer.jogador];

                const newX = currentPos.x + (Math.random() * 10 - 5);
                const newY = currentPos.y + (Math.random() * 10 - 5);

                const clampedX = Math.min(Math.max(newX, 0), 100);
                const clampedY = Math.min(Math.max(newY, 0), 100);

                playerPositions[foundPlayer.jogador] = { x: clampedX, y: clampedY };

                const simulatedData = {
                    bpm: (150 + Math.random() * 40).toFixed(0),
                    velocidade: (Math.random() * 30).toFixed(1),
                    posicao_x: clampedX,
                    posicao_y: clampedY
                };

                io.to(foundPlayer.jogador).emit("playerData", simulatedData);
            }, 1000);

            socket.on("disconnect", () => {
                console.log(`Cliente ${socket.id} desconectado. Parando a simulação.`);
                clearInterval(intervalId);
            });

        } else {
            socket.emit("playerNotFound", "Jogador não encontrado.");
            console.log("Jogador não encontrado na busca. Verifique os dados do formulário e do CSV.");
        }
    });
});

server.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});