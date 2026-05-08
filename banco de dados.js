class BancoDeDados {
    constructor() {
        this.usuarios = [];
        this.idAtual = 1;
    }

    // Criar
    criarUsuario(nome, telefone) {
        const usuario = {
            id: this.idAtual++,
            nome: nome,
            telefone: telefone
        };

        this.usuarios.push(usuario);

        return usuario;
    }

    // Ler
    listarUsuarios() {
        return this.usuarios;
    }

    buscarUsuarioPorId(id) {
        return this.usuarios.find(usuario => usuario.id === id);
    }

    // Atuslizar
    atualizarUsuario(id, novosDados) {
        const usuario = this.buscarUsuarioPorId(id);

        if (!usuario) {
            return "Usuário não encontrado";
        }

        if (novosDados.nome) {
            usuario.nome = novosDados.nome;
        }

        if (novosDados.telefone) {
            usuario.telefone = novosDados.telefone;
        }

        return usuario;
    }

    // Deletar
    removerUsuario(id) {
        const indice = this.usuarios.findIndex(usuario => usuario.id === id);

        if (indice === -1) {
            return "Usuário não encontrado";
        }

        this.usuarios.splice(indice, 1);

        return "Usuário removido";
    }
}