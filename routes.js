const express = require('express');
const route = express.Router();

const projetoController = require('./src/controllers/projetoController');
const loginController = require('./src/controllers/loginController');

route.get('/', (req, res) => {
    res.render('pagina-inicial');
});

route.post('/login/entrar', loginController.entrar);
route.post('/login/registrar', loginController.registrar);
route.get('/login/sair', loginController.sair);

route.get('/projetos/criar', projetoController.index);
route.post('/projetos/criar', projetoController.criar);
route.put('/projetos/editar/:id', projetoController.editar);
route.delete('/projetos/apagar/:id', projetoController.apagar);

module.exports = route;
