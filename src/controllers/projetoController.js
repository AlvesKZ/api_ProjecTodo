const Projeto = require('../models/ProjetoModel');

exports.index = async (req, res) => {
    const projeto = new Projeto({});
    const projetos = await projeto.buscaProjeto();
    res.status(200).json(projetos);
};


exports.criar = async (req, res) => {
    const projeto = new Projeto(req.body);
    await projeto.criar();

    if (projeto.erros.length > 0) {
        console.log('Erro ao criar projeto:', projeto.erros);
        return res.status(400).json({
            errors: e.errors.map( err => err.message)
        });  
    }

    res.redirect('/projetos/home');
};


exports.editar = async (req, res) => {
    const id = req.params.id;
    const projeto = new Projeto(req.body);
    await projeto.editar(id);

    if (projeto.erros.length > 0) {
        return res.status(400).json({
            errors: e.errors.map( err => err.message)
        });
    }
};

exports.apagar = async (req, res) => {
    const id = req.params.id;
    try {
        const projeto = new Projeto({});
        await projeto.apagar(id);

        if (projeto.erros.length > 0) {
            console.log('Erro ao apagar projeto:', projeto.erros);
            return res.status(400).json({
                errors: e.errors.map( err => err.message)
            });
        }

   
    } catch (e) {
        console.error('Erro inesperado ao apagar projeto:', e);
        res.status(500).json({
            errors: e.errors.map( err => err.message)
        });
    }
};

