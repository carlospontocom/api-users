import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ModeloGestaoDados = () => {
    // ESTADOS ORIGINAIS
    const [usuarios, setUsuarios] = useState([]);
    const [modal, setModal] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');

    // NOVO ESTADO ADICIONADO: Para saber qual ID enviar no axios.put
    const [idSelecionado, setIdSelecionado] = useState(null);

    // FUNÇÃO ADICIONADA: Carrega os dados do usuário clicado para dentro dos inputs
    const abrirModalCarregarDados = (usuario) => {
        setIdSelecionado(usuario._id); // Salva o ID do usuário para o PUT
        setNome(usuario.nome);         // Preenche o input Nome
        setEmail(usuario.email);       // Preenche o input Email
        setModal(true);                // Abre o modal
    };

    // FUNÇÃO ADICIONADA: Fecha o modal e limpa os campos para a próxima vez
    const fecharModal = (e) => {
        if (e) e.preventDefault();
        setModal(false);
        setIdSelecionado(null);
        setNome('');
        setEmail('');
    };

    // FUNÇÃO CORRIGIDA: Agora ela usa o idSelecionado do estado
    const editarDados = async (e) => {
        e.preventDefault(); // PREVENTDEFAULT ADICIONADO: Evita que a página recarregue
        try {
            // URL CORRIGIDA: Usando http (padronizado) e o ID do estado
            await axios.put(`http://localhost:8080/usuarios/${idSelecionado}`, {
                nome,
                email
            });
            console.log("Atualizado com sucesso");
            fecharModal(); // Fecha o modal após sucesso
            atualizar();   // Recarrega a lista para mostrar o nome novo
        } catch (error) {
            console.log("Erro ao tentar editar", error);
        }
    };

    const atualizar = async () => {
        try {
            const response = await axios.get("http://localhost:8080/usuarios");
            setUsuarios(response.data);
        } catch (error) {
            console.log("Erro na busca", error);
        }
    };

    const deletar = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/usuarios/${id}`);
            setUsuarios(usuarios.filter(usuario => usuario._id !== id));
            atualizar();
        } catch (error) {
            console.log("Erro ao tentar deletar", error);
        }
    };

    useEffect(() => {
        atualizar();
    }, []);

    return (
        <section className="bg-gray-200 py-20 relative min-h-screen">
            <div className="px-5 max-w-6xl flex flex-col gap-4 mx-auto md:grid md:grid-cols-3 md:gap-4">
                {usuarios.map(usuario => (
                    <div key={usuario._id} className="bg-white p-3 rounded-md shadow">
                        <p className="font-semibold">{usuario.nome}</p>
                        <p>{usuario.email}</p>
                        <div className="flex gap-4 mt-4">
                            {/* CORREÇÃO NO ONCLICK: Chama a função de carregar dados passando o usuário */}
                            <i
                                className="fa-regular fa-pen-to-square text-2xl cursor-pointer text-blue-600"
                                onClick={() => abrirModalCarregarDados(usuario)}
                            ></i>

                            <i
                                className="fa-regular fa-trash-can text-2xl cursor-pointer text-red-600"
                                onClick={() => deletar(usuario._id)}
                            ></i>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL COM CSS DE POSICIONAMENTO ADICIONADO */}
            {modal && (
                <div className="bg-black/50 fixed inset-0 z-50 flex items-center justify-center px-5">
                    <div className="px-4 rounded-lg bg-gray-100 min-w-[320px] md:min-w-[500px] mx-auto pt-4 pb-10 shadow-xl">
                        <h2 className="text-center text-3xl font-bold mt-4 mb-10">Atualização <br /> Cadastral</h2>
                        <form className="flex flex-col gap-4 px-4" onSubmit={editarDados}>
                            <input
                                type="text"
                                placeholder="Nome completo"
                                className="py-3 px-2 bg-white border rounded"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className="py-3 px-2 bg-white border rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <button type="submit" className="bg-green-600 text-white py-2 px-5 cursor-pointer rounded font-bold hover:bg-green-700">
                                Salvar Alterações
                            </button>

                            {/* TYPE="BUTTON" ADICIONADO: Para o cancelar não disparar o form */}
                            <button type="button" className="bg-red-600 text-white py-2 px-5 cursor-pointer rounded font-bold hover:bg-red-700" onClick={fecharModal}>
                                Cancelar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}

export default ModeloGestaoDados;