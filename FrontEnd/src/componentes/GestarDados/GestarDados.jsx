import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GestarDados = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [idEditando, setIdEditando] = useState(null);

    const urlBase = "http://localhost:8080/usuarios";

    // =============================
    // EDITAR USUÁRIO (ROTA PROTEGIDA)
    // =============================
    async function editarUsuario(e) {
        e.preventDefault();

        if (!idEditando) return;

        try {
            const token = localStorage.getItem("token");

            await axios.put(`${urlBase}/${idEditando}`,
                { nome, email, senha },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Usuário atualizado com sucesso!");

            setIdEditando(null);
            setNome('');
            setEmail('');
            setSenha('');

            getUsuarios();

        } catch (error) {
            alert("Erro ao atualizar usuário.");
        }
    }

    // =============================
    // BUSCAR USUÁRIOS
    // =============================
    async function getUsuarios() {
        try {
            const response = await axios.get(urlBase);
            setUsuarios(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUsuarios();
    }, []);

    // =============================
    // DELETAR USUÁRIO (ROTA PROTEGIDA)
    // =============================
    async function deletarUsuario(id) {

        if (!window.confirm("Deseja REALMENTE excluir?")) return;

        try {
            const token = localStorage.getItem("token");

            await axios.delete(`${urlBase}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            alert("Usuário excluído com sucesso!");
            getUsuarios();

        } catch (error) {
            alert("Erro ao excluir usuário.");
        }
    }

    // =============================
    // PREPARAR EDIÇÃO
    // =============================
    function prepararEdicao(item) {
        setIdEditando(item._id);
        setNome(item.nome);
        setEmail(item.email);
        setSenha('');
        window.scrollTo(0, 0); // rolar para o topo para ver o formulário
    }

    // =============================
    // CANCELAR EDIÇÃO
    // =============================
    function cancelarEdicao() {
        setIdEditando(null);
        setNome('');
        setEmail('');
        setSenha('');
    }

    return (
        <>
            <h3 className="text-center text-6xl py-8 font-bold">
                Gestão de usuário
            </h3>

            {/* FORMULÁRIO APENAS PARA EDIÇÃO */}
            {idEditando && (
                <form
                    onSubmit={editarUsuario}
                    className="max-w-md mx-auto mb-10 p-6 border border-gray-300 rounded-lg shadow-md"
                >
                    <h4 className="text-2xl mb-4 font-semibold">Editando Usuário</h4>

                    <div className="mb-4">
                        <label className="block mb-1 font-semibold" htmlFor="nome">Nome:</label>
                        <input
                            id="nome"
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                            className="w-full border border-gray-400 rounded px-3 py-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-semibold" htmlFor="email">Email:</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-400 rounded px-3 py-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-semibold" htmlFor="senha">Senha:</label>
                        <input
                            id="senha"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Digite nova senha (opcional)"
                            className="w-full border border-gray-400 rounded px-3 py-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold transition"
                    >
                        Atualizar Usuário
                    </button>

                    <button
                        type="button"
                        onClick={cancelarEdicao}
                        className="mt-3 w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded font-semibold transition"
                    >
                        Cancelar edição
                    </button>
                </form>
            )}

            {/* LISTA DE USUÁRIOS */}
            <section className="py-10 px-2">
                <div className="flex flex-col gap-4 px-2 md:grid md:grid-cols-3 mx-auto max-w-4xl">

                    {usuarios.map(item => (
                        <div
                            key={item._id}
                            className="shadow-md py-10 px-3 rounded-lg border border-gray-200 flex flex-col gap-1 text-center"
                        >
                            <p className="text-lg">{item.nome}</p>
                            <p className="text-lg">{item.email}</p>

                            <div className="flex gap-3 mt-3 justify-center">
                                <button
                                    className="p-2 rounded-lg cursor-pointer bg-orange-400 text-white"
                                    onClick={() => prepararEdicao(item)}
                                >
                                    Editar
                                </button>

                                <button
                                    className="p-2 rounded-lg cursor-pointer bg-red-600 text-white"
                                    onClick={() => deletarUsuario(item._id)}
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            </section>
        </>
    );
};

export default GestarDados;
