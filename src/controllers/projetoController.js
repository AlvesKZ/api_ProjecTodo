const Projeto = require('../models/ProjetoModel');

exports.index = async (req, res) => {
    const projeto = new Projeto({});
    const projetos = await projeto.index();

    res.status(200).json({
        usuario: req.session.usuario,
        projetos
    });
};

exports.criar = async (req, res) => {
    try {
        const projeto = new Projeto(req.body, req.session);
        await projeto.criar();

        if (projeto.erros.length > 0) {
            return res.status(400).json({ 
                errors: projeto.erros 
            });
        }

        res.status(200).json({ 
            mensagem: 'Projeto criado com sucesso' 
        });
    } catch (e) {
        console.error('Erro inesperado ao criar projeto:', e);
        return res.status(500).json({
            errors: ['Erro interno do servidor.']
        });
    }
};

exports.editar = async (req, res) => {
    const id = req.params.id;
    const projeto = new Projeto(req.body, req.session);

    await projeto.editar(id);

    if (projeto.erros.length > 0) {
        return res.status(400).json({ erros: projeto.erros });
    }

    return res.status(200).json({ mensagem: 'Projeto editado com sucesso' });
};

exports.apagar = async (req, res) => {
    const id = req.params.id;
    const projeto = new Projeto({}, req.session);

    await projeto.apagar(id);

    if (projeto.erros.length > 0) {
        return res.status(400).json({ errors: projeto.erros });
    }

    return res.status(200).json({ mensagem: 'Projeto apagado com sucesso' });
};

exports.mostrar = async (req, res) => {
  const id = req.params.id;
  const projeto = new Projeto({}, req.session);

  try {
    const doc = await projeto.mostrar(id);

    if (!doc.exists) {
      return res.status(404).json({ mensagem: 'Projeto não encontrado' });
    }

    const projetoData = { id: doc.id, ...doc.data() };

    return res.status(200).json({ projeto: projetoData });
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    return res.status(500).json({ mensagem: 'Erro interno ao buscar projeto' });
  }
};
