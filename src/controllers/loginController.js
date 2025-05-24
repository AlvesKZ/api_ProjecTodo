const Login = require('../models/LoginModel');

exports.entrar = async (req, res) => {
    const login = new Login(req.body);
    await login.entrar();

    if (login.erros.length > 0) {
        console.log('Erro entrar:', login.erros);
        return res.status(400).json({
            errors: login.erros
        });
    }

    req.session.usuario = {
        id: login.usuario.id,
        email: login.usuario.email,
        nome: login.usuario.nome
    };

    return res.status(200).json({
        msg: 'Usuario logado com sucesso',
        usuario: req.session.usuario
    });
};

exports.registrar = async (req, res) => {
    const login = new Login(req.body);
    await login.registra();

    if (login.erros.length > 0) {
        console.log('Erro ao se registrar:', login.erros);
        return res.status(400).json({
            errors: login.erros
        });
    }

    return res.status(201).json({
        mensagem: 'Usuário registrado com sucesso!',
        id: login.usuario.id
    });
};

exports.sair = (req, res) => {
    req.session.destroy();
    res.status(200).json({ mensagem: 'Sessão encerrada com sucesso.' });
};
