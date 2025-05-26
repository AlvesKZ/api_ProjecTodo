exports.verificaLogin = (req, res, next) => {
    if(!req.session.user ){
        req.session.save(() => res.redirect('/'));
        return;
    }

  next();
};

exports.verificaUsuario = (req, res, next) => {

};