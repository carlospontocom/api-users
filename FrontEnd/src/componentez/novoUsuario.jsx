import React, { useState } from 'react';
import axios from 'axios';
import ListaContatos from './ListaContatos/ListaContatos';

export default function NovoUsuario() {
    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: ''
    });
    const [mensagem, setMensagem] = useState('');
    const [erro, setErro] = useState('');

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setMensagem('');
        setErro('');

        try {
            await axios.post('http://localhost:3000/usuarios', form);
            setMensagem('Usuário criado com sucesso!');
            setForm({ nome: '', email: '', senha: '' });
        } catch (error) {
            const msg = error.response?.data?.error || 'Erro ao criar usuário';
            setErro(msg);
        }
    }

    return (

        <>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
                <h1 className="text-6xl font-bold mb-6 text-center">Cadastro de Usuário</h1>

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label className="block mb-1 font-medium">Nome</label>
                        <input
                            type="text"
                            name="nome"
                            placeholder="Digite seu nome"
                            value={form.nome}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Digite seu email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Senha</label>
                        <input
                            type="password"
                            name="senha"
                            placeholder="Digite uma senha"
                            value={form.senha}
                            onChange={handleChange}
                            required
                            minLength={6}
                            className="w-full border border-gray-300 rounded px-3 py-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded transition-colors"
                    >
                        Cadastrar
                    </button>
                </form>

                {mensagem && <p className="text-green-600 mt-4 text-center">{mensagem}</p>}
                {erro && <p className="text-red-600 mt-4 text-center">{erro}</p>}
            </div>

            {/* <div className="mt-8 pb-8">
                <ListaContatos />
            </div> */}

        </>
    );
}
