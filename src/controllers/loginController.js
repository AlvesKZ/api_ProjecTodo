const Login = require('../models/LoginModel');

exports.entrar = async (req,res) => {
    const login = new Login(req.body);
    await login.entrar();

    if(login.erros.length > 0 ) {
        console.log('Erro entrar:', login.erros);  
        return res.status(400).json({
            errors: e.errors.map( err => err.message)
        });   
    }

    req.session.usuario = {
        id: login.usuario.id,
        email: login.usuario.email,
        nome: login.usuario.nome
    };

};

exports.registrar = async (req, res) => {
    const login = new Login(req.body);
    await login.registra(); 

    if (login.erros.length > 0) {
        console.log('Erro ao se registrar:', login.erros);  
        return res.status(400).json({
            errors: e.errors.map( err => err.message)
        });
    }
  
};

exports.sair = (req, res) => {
  req.session.destroy();
};