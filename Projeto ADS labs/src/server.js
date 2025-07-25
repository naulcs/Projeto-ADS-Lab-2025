    const express = require('express');
    const cors = require('cors'); 
    const connection = require('./database');
    const routes = require('./routes');
    
    const app = express();
    
    app.use(cors()); 
    
    app.use(express.json());
    app.use(routes);
    
    const PORT = 3000;
    
    connection.sync({ force: false }).then(() => {
      console.log('Base de dados sincronizada.');
      app.listen(PORT, () => {
        console.log(`🚀 Servidor a rodar na porta ${PORT}`);
      });
    });
    