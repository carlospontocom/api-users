import axios from 'axios';
import React, { useState } from 'react'
import Campos from '../Campos/Campos';

const Recriando = () => {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');


    const urlBase = "http://localhost:8080/usuarios";


    function validarAndAdd(e) {
        e.preventDefault();


        addUsuarios(nome, email, senha)
        // }
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
        </>
    )
}

export default Recriando
