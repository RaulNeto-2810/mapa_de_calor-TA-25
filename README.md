# ⚽ Simulador de Rastreamento de Jogadores

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.x-brightgreen.svg)](https://nodejs.org/)

## 📄 Descrição do Projeto
Este projeto é uma aplicação full-stack que simula um sistema de rastreamento de jogadores de futebol em tempo real. A aplicação coleta dados fictícios de sensores (posição, velocidade e batimentos cardíacos) e os transmite a um cliente web, onde são visualizados em um mapa de calor interativo sobre um campo de futebol.

O objetivo é demonstrar a comunicação em tempo real entre cliente e servidor, utilizando tecnologias modernas para criar uma experiência de usuário dinâmica e visualmente rica.

## ✨ Funcionalidades
- **Rastreamento em Tempo Real:** Dados de jogadores são transmitidos e atualizados a cada segundo via WebSockets.

- **Visualização de Mapa de Calor:** A movimentação do jogador é visualizada como um mapa de calor, mostrando as áreas de maior atividade em campo.

- **Seleção Dinâmica de Jogadores:** O usuário pode pesquisar jogadores por liga, time e jogo usando menus dropdown que são preenchidos dinamicamente com base nos dados disponíveis.

- **Simulação Realista:** O movimento do jogador é simulado de forma mais orgânica, criando um rastro de movimento realista em vez de apenas pontos aleatórios.

## 🛠️ Tecnologias Utilizadas

### Backend

- **Node.js:** Ambiente de execução JavaScript no lado do servidor.

- **Express:** Framework web para Node.js, utilizado para servir a aplicação.

- **Socket.IO:** Biblioteca para comunicação bidirecional em tempo real, essencial para o rastreamento.

### Frontend

- **HTML5:** Estrutura da página.

- **CSS3:** Estilização da interface.

- **JavaScript (ES6+):** Lógica da aplicação no lado do cliente.

- **Simpleheat.js:** Biblioteca JavaScript leve para a geração do mapa de calor.

### Dados

- **Arquivo CSV:** Os dados dos jogadores são armazenados em um arquivo CSV e lidos pelo servidor.

## 🚀 Como Executar o Projeto
Siga estes passos para ter o projeto rodando em sua máquina local.

### Pré-requisitos
- Node.js (versão 14.x ou superior)
- npm (gerenciador de pacotes do Node.js)
- Python (opcional, para gerar o arquivo CSV com muitos dados)

### Instalação

1. Clone este repositório para a sua máquina local:

```bash
git clone https://github.com/RaulNeto-2810/mapa_de_calor-TA-25.git
cd mapa_de_calor-TA-25
```
2. Instale as dependências do Node.js:

```bash
npm install
```
### Geração de Dados (Opcional)

Se você quiser gerar um arquivo CSV com mais de 2000 dados fictícios, você pode usar o script em Python incluído no projeto.

Execute o script na pasta raiz do projeto:

```bash
python generate_data.py
```
Este comando irá criar ou substituir o arquivo players.csv.

### Executando a Aplicação

1. Inicie o servidor Node.js:

```bash
node servidor.js
```
2. Abra o seu navegador e acesse a URL:

```
http://localhost:3000
```

A aplicação será carregada, e você poderá selecionar um jogador para começar a visualizar o mapa de calor em tempo real.

## 👥 Contribuindo

Contribuições são sempre bem-vindas! Por favor, siga estes passos:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça commit das suas alterações (`git commit -m 'Add some AmazingFeature'`)
4. Faça push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
