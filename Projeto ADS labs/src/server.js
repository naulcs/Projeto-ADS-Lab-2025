const express = require('express');
const connection = require('./database'); // Importe a conexão em vez de só executar
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

const PORT = 3000;

connection.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor a rodar na porta ${PORT}`);
  });
});
