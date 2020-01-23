// ? importações
require("dotenv/config");
config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const http = require("http");
const { setupWebsocket } = require("./websocket");

// ? inicia o express
const app = express();

// ? separa o server htpp do websocket
const server = http.Server(app);

// ? configura o websocket
setupWebsocket(server);

// ? faz a conexão com a DB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true
});

app.use(cors()); // ? configura o cors
app.use(express.json()); // ? define o express para aceitar json
app.use(routes); // ? define as rotas

server.listen(process.env.PORT || 3001); // ? define a porta do servidor
