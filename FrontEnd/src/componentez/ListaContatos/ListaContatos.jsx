import { useState, useEffect } from 'react';
import axios from 'axios';

const ListaContatos = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [modal, setModal] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
    const [formData, setFormData] = useState({ nome: "", email: "", senha: "" });

    const [modalAdicionar, setModalAdicionar] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    // 🔎 Estado da busca
    const [busca, setBusca] = useState('');

    const atualizar = async () => {
        try {
            const response = await axios.get("http://localhost:3000/usuarios");
            setUsuarios(response.data);
        } catch (error) {
            console.log("Erro na tentativa de busca de usuarios", error);
        }
    };

    useEffect(() => {
        atualizar();
    }, []);

    const deletarUsuario = async (id) => {
        if (window.confirm("Deseja realmente excluir?")) {
            try {
                await axios.delete(`http://localhost:3000/usuarios/${id}`);
                atualizar();
            } catch (error) {
                console.error("Erro ao deletar no servidor:", error);
            }
        }
    };

    const openModalEditar = (usuario) => {
        setUsuarioSelecionado(usuario);
        setFormData({ nome: usuario.nome, email: usuario.email, senha: "" });
        setModal(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const salvarEdicao = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/usuarios/${usuarioSelecionado.id}`, formData);
            setModal(false);
            atualizar();
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
        }
    };

    const formNovoContato = () => {
        setModalAdicionar(!modalAdicionar);
    };

    const addUsuario = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/usuarios", { nome, email, senha });
            atualizar();
            setModalAdicionar(false);
            setNome("");
            setEmail("");
            setSenha("");
        } catch (error) {
            console.error("Erro ao adicionar usuário:", error);
        }
    };

    // 🔎 Filtrando usuários
    const usuariosFiltrados = usuarios.filter(u =>
        u.nome.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <section className="relative">
            <div className="max-w-6xl mx-auto px-2">
                <h3 className="text-5xl text-center font-bold my-6">Lista de usuários</h3>

                {/* Barra de adição e pesquisa */}
                <div className="flex justify-between">
                    <button
                        onClick={formNovoContato}
                        className="bg-blue-600 text-white px-6 py-4 rounded-md cursor-pointer"
                    >
                        Add
                    </button>
                    <input
                        type="text"
                        placeholder="Buscar por...."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        className="border border-gray-400 rounded-lg py-4 px-2 w-[400px]"
                    />
                </div>

                {/* Lista filtrada */}
                <div className="flex flex-col gap-4 py-8 md:grid md:grid-cols-3">
                    {usuariosFiltrados.length > 0 ? (
                        usuariosFiltrados.map(item => (
                            <div key={item.id} className="p-8 shadow-md border rounded-lg flex flex-col gap-2 items-center">
                                <p className="font-semibold uppercase">{item.nome}</p>
                                <p>{item.email}</p>
                                <div className="flex gap-3">
                                    <button
                                        className="bg-gray-600 text-white px-8 py-2 rounded-sm"
                                        onClick={() => deletarUsuario(item.id)}
                                    >
                                        Excluir
                                    </button>
                                    <button
                                        className="bg-orange-500 text-white px-8 py-2 rounded-sm"
                                        onClick={() => openModalEditar(item)}
                                    >
                                        Editar
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-red-600 text-center col-span-3 font-semibold">
                            Nenhum usuário encontrado
                        </p>
                    )}
                </div>
            </div>

            {/* Modal Editar */}
            {modal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl">
                        <h4 className="text-gray-100 text-3xl text-center pb-6">Atualizar dados</h4>
                        <form className="flex flex-col gap-4" onSubmit={salvarEdicao}>
                            <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" className="px-3 py-4 border rounded-md bg-white" />
                            <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" className="px-3 py-4 border rounded-md bg-white" />
                            <input type="password" name="senha" value={formData.senha} onChange={handleChange} placeholder="Senha" className="px-3 py-4 border rounded-md bg-white" />
                            <div className="flex gap-2">
                                <button type="submit" className="bg-blue-600 text-white px-6 py-4 rounded-md">Atualizar</button>
                                <button type="button" className="bg-gray-600 text-white px-6 py-4 rounded-md" onClick={() => setModal(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Adicionar */}
            {modalAdicionar && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-2xl">
                        <h4 className="text-gray-100 text-3xl text-center pb-6">Adicionar contato</h4>
                        <form className="flex flex-col gap-4" onSubmit={addUsuario}>
                            <input type="text" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" className="px-3 py-4 border rounded-md bg-white" />
                            <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" className="px-3 py-4 border rounded-md bg-white" />
                            <input type="password" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" className="px-3 py-4 border rounded-md bg-white" />
                            <div className="flex gap-2">
                                <button type="submit" className="bg-blue-600 text-white px-6 py-4 rounded-md cursor-pointer">Adicionar contato</button>
                                <button type="button" className="bg-gray-600 text-white px-6 py-4 rounded-md" onClick={formNovoContato}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ListaContatos;