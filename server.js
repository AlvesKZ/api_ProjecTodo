  const express = require('express');
  const app = express();
  const session = require('express-session');
  const routes = require('./routes');
  const cors = require('cors');

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(session({
    secret: 'logado',
    resave: false,
    saveUninitialized: false
  }));

  app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario;
    next();
  });
  app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
  }));
  app.use(routes);

  app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
  });
