
/* Libraries - Bibliotecas 3tr part */

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');
const path = require('path');

/* Configuração do servidor  */
const config = require("./config");
const publicRoutes = require('./routes/publicRoutes');
const dbService = require('./services/db.service');

/* Ambiente */
const environment = process.env.NODE_ENV;

/* Inicializando aplicação Express*/
const app = express();
const server = http.Server(app);
const mappedOpenRoutes = mapRoutes(publicRoutes, "src/controllers/");
const DB = dbService(environment, config.migrate).start();

/* Allow cros origin requests*/
app.use(cors());

/* Passar as requisições em JSON */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/public", mappedOpenRoutes);

app.use(express.static(path.join(__dirname, '/../client/build')));

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'/../client/build/index.html'));
});

server.listen(config.port, () => {
    if (environment !== "production" && environment !== "development") {
      console.error(
        `NODE_ENV is set to ${environment}, but only production and development are valid.`
      );
      process.exit(1);
    }

    console.log(`Start port: ${config.port}`)

    return DB;
});
