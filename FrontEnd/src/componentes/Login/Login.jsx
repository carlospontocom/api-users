import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [erro, setErro] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro('');

        try {
            const response = await axios.post('http://localhost:8080/login', {
                email: email,
                senha: password
            });

            if (response.data.success) {
                console.log("Logado com sucesso!", response.data);

                localStorage.setItem('token', response.data.token);

                localStorage.setItem('user', JSON.stringify(response.data.usuario));

                alert(`Bem-vindo, ${response.data.usuario.nome}!`);

                window.location.href = '/dashboard';
            }
        } catch (err) {
            const mensagemErro = err.response?.data?.message || "Erro ao conectar com o servidor";
            setErro(mensagemErro);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center">
            <h2 className="text-6xl font-bold px-3 py-10 text-center">
                Área de login
            </h2>

            <form onSubmit={handleLogin} className="flex flex-col gap-7 max-w-xl mx-auto w-full px-4">

                {/* Exibe mensagem de erro se existir */}
                {erro && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {erro}
                    </div>
                )}

                <div className="flex flex-col gap-1">
                    <label className="text-gray-400">Email/login</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="py-3 px-2 border border-gray-300 rounded-md text-[18px] focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="seu@email.com"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-gray-400">Senha</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="py-3 px-2 border border-gray-300 rounded-md text-[18px] focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Sua senha secreta"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-green-600 text-white font-semibold py-3 mt-3 rounded-md text-[18px] cursor-pointer hover:bg-green-700 transition-colors shadow-md"
                >
                    Acessar
                </button>
            </form>
        </div>
    );
};

export default Login;