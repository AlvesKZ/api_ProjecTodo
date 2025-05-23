const db = require('../../firebase');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

class Login {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.usuario = null;
    }

    
    async entrar() {
        this.valida();
        if (this.erros.length > 0) return;

        const consulta = await db.collection('usuarios').where('email', '==', this.body.email).get();

        if (consulta.empty) {
            this.erros.push('Usuário não existe');
            return;
        }

        const doc = consulta.docs[0];
        const dadosUsuario = doc.data();

        const senhaValida = bcryptjs.compareSync(this.body.senha, dadosUsuario.senha);

        if (!senhaValida) {
            this.erros.push('Senha inválida');
            return;
        }

        this.usuario = { id: doc.id, ...dadosUsuario }; 
    }

    async registra() {
        if (!this.body || !this.body.nome || !this.body.email || !this.body.senha) {
            this.erros.push('Nome, email e senha são obrigatórios.');
            return;
        }

        this.valida();
        if (this.erros.length > 0) return;

        await this.usuarioExiste();
        if (this.erros.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt);

        try {
            this.usuario = await db.collection('usuarios').add({
                nome: this.body.nome,
                email: this.body.email,
                senha: this.body.senha
            });
        } catch (e) {
            this.erros.push('Erro ao registrar usuário.');
        }
    }

    async usuarioExiste() {
        const consulta = await db.collection('usuarios').where('email', '==', this.body.email).get();
        if (!consulta.empty) {
            this.erros.push('Usuário já existe.');
        }
    }

    valida() {
        this.limpa();

        if (!validator.isEmail(this.body.email)) {
            this.erros.push('E-mail inválido');
        }

        if (this.body.senha.length < 3 || this.body.senha.length > 50) {
            this.erros.push('A senha precisa ter entre 3 e 50 caracteres.');
        }
    }

    limpa() {
        for (const campo in this.body) {
            if (typeof this.body[campo] !== 'string') {
                this.body[campo] = '';
            }
        }
    }
}

module.exports = Login;
