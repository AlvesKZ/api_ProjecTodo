const db = require('../../firebase');

class Projeto {
    constructor(body, session) {
        this.body = body;
        this.session = session;
        this.erros = [];
        this.projeto = null;
    }

    valida() {
        const { nome, descricao, inicio, entrega } = this.body;
        if (!nome || !descricao || !inicio || !entrega) {
            this.erros.push('Todos os campos devem estar preenchidos');
            return;
        }

        if (isNaN(new Date(inicio))) {
            this.erros.push('Data de início inválida');
        }

        if (isNaN(new Date(entrega))) {
            this.erros.push('Data de entrega inválida');
        }
    }

    getUsuarioNome() {
        return this.session?.usuario?.nome || this.body.usuario || 'Desconhecido';
    }

    async criar() {
        this.valida();
        if (this.erros.length > 0) return;

        try {
            const novoProjeto = {
                nome: this.body.nome,
                usuario: this.getUsuarioNome(),
                descricao: this.body.descricao,
                inicio: new Date(this.body.inicio),
                entrega: new Date(this.body.entrega),
                status: !!this.body.status,
            };

            const projetoRef = await db.collection('projetos').add(novoProjeto);
            this.projeto = { id: projetoRef.id, ...novoProjeto };
        } catch (e) {
            console.error('Erro ao salvar no banco:', e);
            this.erros.push('Erro ao criar projeto');
        }
    }

    async index() {
        try {
            const conexao = await db.collection('projetos').get();
            const projetos = conexao.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return projetos;
        } catch (e) {
            console.error('Erro ao buscar projetos:', e);
            this.erros.push('Erro ao buscar projetos');
            return [];
        }
    }

    async editar(id) {
        this.valida();
        if (this.erros.length > 0) return;

        try {
            const projetoAtualizado = {
                nome: this.body.nome,
                usuario: this.getUsuarioNome(),
                descricao: this.body.descricao,
                inicio: new Date(this.body.inicio),
                entrega: new Date(this.body.entrega),
                status: !!this.body.status,
            };

            await db.collection('projetos').doc(id).update(projetoAtualizado);
            this.projeto = { id, ...projetoAtualizado };
        } catch (e) {
            console.error('Erro ao atualizar projeto:', e);
            this.erros.push('Erro ao editar projeto');
        }
    }

    async apagar(id) {
        try {
            await db.collection('projetos').doc(id).delete();
        } catch (e) {
            console.error('Erro ao apagar projeto:', e);
            this.erros.push('Erro ao apagar projeto');
        }
    }

    async mostrar(id) {
        try {
            const doc = await db.collection('projetos').doc(id).get();
            return doc;  
        } catch(e) {
            this.erros.push('Erro ao buscar projeto');
            throw e; 
        }
    }
}

module.exports = Projeto;
