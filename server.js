const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

const routes = require('./routes');

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

app.use(routes);

app.listen(3000, () => {
    console.log('servidor rodando em http://localhost:3000');
});
