require("dotenv").config();
const path = require("path");
const methodOverride = require("method-override");
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { Server } = require("socket.io")
const { createServer } = require("node:http")
const { join } = require('node:path');


const APP_PORT = process.env.APP_PORT || 3000;
const app = express();
const server = createServer(app)
const io = new Server(server)

app.use(cors());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


routes(app);


app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

io.on('connect_error', (error) => {
  console.error('Error en la conexión del socket:', error);
});


server.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});

process.on("SIGINT", function () {
  const { mongoose } = require("./db");
  mongoose.connection.close(function () {
    console.log("Mongoose default connection is disconnected due to application termination.\n");
    process.exit(0);
  });
});
