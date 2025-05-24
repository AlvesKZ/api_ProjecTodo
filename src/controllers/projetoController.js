const Projeto = require('../models/ProjetoModel');

exports.index = async (req, res) => {
    const projeto = new Projeto({});
    const projetos = await projeto.buscar();
    res.status(200).json(projetos);
};

exports.criar = async (req, res) => {
    try {
        const projeto = new Projeto(req.body, req.session);
        await projeto.criar();

        if (projeto.erros.length > 0) {
            return res.status(400).json({ errors: projeto.erros });
        }

        res.status(200).json({ mensagem: 'Projeto criado com sucesso' });
    } catch (e) {
        console.error('Erro inesperado ao criar projeto:', e);
        res.status(500).json({ errors: ['Erro interno do servidor.'] });
    }
};


exports.editar = async (req, res) => {
    const id = req.params.id;
    const projeto = new Projeto(req.body, req.session);
    await projeto.editar(id);

    if (projeto.erros.length > 0) {
        return res.status(400).json({
            errors: projeto.erros
        });
    }

    res.status(200).json({ mensagem: 'Projeto editado com sucesso' });
};

exports.apagar = async (req, res) => {
    const id = req.params.id;
    const projeto = new Projeto({});
    await projeto.apagar(id);

    if (projeto.erros.length > 0) {
        console.log('Erro ao apagar projeto:', projeto.erros);
        return res.status(400).json({
            errors: projeto.erros
        });
    }

    res.status(200).json({ mensagem: 'Projeto apagado com sucesso' });
};