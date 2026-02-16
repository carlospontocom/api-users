import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Campos from '../Campos/Campos';

const Recriando = () => {

    const [usuarios, setUsuarios] = useState([]);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [idEditando, setIdEditando] = useState(null);

    const urlBase = "http://localhost:8080/usuarios";


    function validarAndAdd(e) {
        e.preventDefault();

        if (idEditando) {
            editar(nome, email, senha)
        } else {
            addUsuarios(nome, email, senha)
        }
    }


    async function addUsuarios(nome, email, senha) {
        try {
            const response = await axios.post(urlBase, {
                nome,
                email,
                senha
            });

            console.log("✅ Cadastrado com sucesso", response.data);
            alert("Usuário cadastrado com sucesso!");

            // Limpar formulário
            setNome('');
            setEmail('');
            setSenha('');

            // Atualizar lista
            getUsuarios();

        } catch (error) {
            console.log("❌ Erro detalhado:", {
                status: error.response?.status,
                mensagemBackend: error.response?.data,
                url: error.config?.url,
                dadosEnviados: error.config?.data
            });

            alert('Erro ao cadastrar. Verifique os dados ou contate o suporte.');
        }
    }

    async function editar(nome, email, senha) {
        try {
            await axios.put(`${urlBase}/${idEditando}`, { nome, email, senha });

            alert("Usuário atualizado com sucesso!");

            // Limpa os campos e sai do modo edição
            setIdEditando(null);
            setNome('');
            setEmail('');
            setSenha('');

            // Atualiza a lista na tela
            getUsuarios();
        } catch (error) {
            console.error("Erro ao editar:", error);
            alert("Erro ao atualizar usuário.");
        }
    }


    //Pegar usuários e mostrar na tela do frontend
    async function getUsuarios() {
        try {
            const response = await axios.get(urlBase);
            setUsuarios(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUsuarios();
    }, [])


    //deletar 
    async function deletarUsuario(id) {

        if (!confirm("Deseja REALMENTE excluir?")) return;

        try {
            const response = await axios.delete(`${urlBase}/${id}`);
            console.log("Deletado com sucesso", response.data);
            getUsuarios();
        } catch (error) {
            console.log("Erro de exclusão", error)
        }
    }

    //atualizar
    async function prepararEdicao(item) {
        setIdEditando(item._id);
        setNome(item.nome);
        setEmail(item.email);
        setSenha('');
        window.scrollTo(0, 0);
    }


    return (
        <>
            <h3 className="text-center text-6xl py-8 font-bold">Gestão de usuário</h3>

            <form className="flex flex-col gap-3 p-3 max-w-xl mx-auto" onSubmit={validarAndAdd}>
                <div>
                    <input type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome"
                        className="p-4 text-lg border border-gray-400 w-full" />
                </div>

                <div>
                    <input type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="p-4 text-lg border border-gray-400 w-full" />
                </div>


                <div>
                    <input type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Senha"
                        className="p-4 text-lg border border-gray-400 w-full" />
                </div>

                <Campos type="text" placeholder="Campo  text via props" onChange="teste" />


                <button className="p-4 text-lg border border-gray-400 bg-green-400 cursor-pointer">Salvar</button>
            </form>

            <section className="py-10 px-2">
                <div className="flex flex-col gap-4 px-2 md:grid md:grid-cols-3 gap-4 mx-auto max-w-4xl">
                    {
                        usuarios.map(item => (
                            <div key={item._id} className="shadow-md py-10 px-3 rounded-lg border border-gray-200 flex flex-col gap-1 text-center">
                                <p className="text-lg">{item.nome}</p>
                                <p className="text-lg">{item.email}</p>
                                <div className="flex gap-3 mt-3 justify-center">
                                    <button className="p-2 rounded-lg cursor-pointer bg-orange-400 text-white" onClick={() => prepararEdicao(item)}>Editar</button>
                                    <button className="p-2 rounded-lg cursor-pointer bg-red-600 text-white" onClick={() => deletarUsuario(item._id)}>Excluir</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
        </>
    )
}

export default Recriando
