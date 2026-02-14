import React from 'react';
import Campos from '../Campos/Campos';
import { useState } from 'react';
import axios from 'axios';


const FormularioCadastro = () => {
    const [dadosUsuario, setDadosUsuario] = useState({
        nome: "",
        email: "",
        cpf: "",
        cep: "",
        logradouro: "",
        bairro: "",
        numero: "",
        cidade: "",
        uf: "",
        complemento: "",
        senha: "",
        confirmarSenha: ""
    });

    const handleValidarDados = (e) => {
        e.preventDefault();
        if (!dadosUsuario.nome || dadosUsuario.nome.trim() === "") {
            alert("Campo deve ser preenchido");
        }
        else {
            axios.post("http://localhost:8080/usuarios", dadosUsuario)
                .then(response => {
                    console.log("Cadastrado com sucesso", response.data)
                    alert("Cadastrado com sucesso")
                }).catch(error => {
                    console.error("Erro no cadastro", error)
                })
        }
    }

    return (
        <section className="bg-blue-100 min-h-screen flex flex-col justify-center py-6">
            <form onSubmit={handleValidarDados}
                className="flex flex-col gap-2 px-2 max-w-3xl mx-auto min-w-[400px] bg-white py-7 rounded-md shadow-md md:min-w-[650px] md:grid md:grid-cols-2 md:px-8 md: gap-5">
                <h2 className="text-5xl font-bold mb-4 text-center col-span-2"> Cadastro de clientes</h2>
                <Campos type="text" placeholder="Nome" msgErro="Campo obrigatório" value={dadosUsuario.nome} onChange={(e) => setDadosUsuario({ ...dadosUsuario, nome: e.target.value })} />


                <Campos type="email" placeholder="E-mail" msgErro="Campo obrigatório" value={dadosUsuario.email} onChange={(e) => setDadosUsuario({ ...dadosUsuario, email: e.target.value })} />


                <Campos type="text" placeholder="CPF" msgErro="Campo obrigatório" value={dadosUsuario.cpf} onChange={(e) => setDadosUsuario({ ...dadosUsuario, cpf: e.target.value })} />


                <Campos type="text" placeholder="CEP" msgErro="Campo obrigatório" value={dadosUsuario.cep} onChange={(e) => setDadosUsuario({ ...dadosUsuario, cep: e.target.value })} />


                <Campos type="text" placeholder="Logradouro" msgErro="Campo obrigatório" value={dadosUsuario.logradouro} onChange={(e) => setDadosUsuario({ ...dadosUsuario, logradouro: e.target.value })} />


                <Campos type="text" placeholder="Bairro" msgErro="Campo obrigatório" value={dadosUsuario.bairro} onChange={(e) => setDadosUsuario({ ...dadosUsuario, bairro: e.target.value })} />


                <Campos type="text" placeholder="Número" msgErro="Campo obrigatório" value={dadosUsuario.numero} onChange={(e) => setDadosUsuario({ ...dadosUsuario, numero: e.target.value })} />


                <Campos type="text" placeholder="Cidade" msgErro="Campo obrigatório" value={dadosUsuario.cidade} onChange={(e) => setDadosUsuario({ ...dadosUsuario, cidade: e.target.value })} />


                <Campos type="text" placeholder="UF" msgErro="Campo obrigatório" value={dadosUsuario.uf} onChange={(e) => setDadosUsuario({ ...dadosUsuario, uf: e.target.value })} />


                <Campos type="text" placeholder="Complemento" msgErro="Campo obrigatório" value={dadosUsuario.complemento} onChange={(e) => setDadosUsuario({ ...dadosUsuario, complemento: e.target.value })} />


                <Campos type="password" placeholder="Senha" msgErro="Campo obrigatório" value={dadosUsuario.senha} onChange={(e) => setDadosUsuario({ ...dadosUsuario, senha: e.target.value })} />


                <Campos type="password" placeholder="Confirmar Senha" msgErro="Campo obrigatório" value={dadosUsuario.confirmarSenha} onChange={(e) => setDadosUsuario({ ...dadosUsuario, confirmarSenha: e.target.value })} />


                <button className="bg-green-600 text-white font-semibold py-2 rounded-md cursor-pointer">Cadastrar Usuário</button>
            </form>
        </section>
    )
}

export default FormularioCadastro
