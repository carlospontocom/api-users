import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Recriando from '../Modelo-de-atualizar/Recriando';
import GestarDados from '../GestarDados/GestarDados';


const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token) {
            navigate('/login');
        } else if (userData) {
            setUser(JSON.parse(userData));
        }
    }, [navigate]);

    // Função para deslogar
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove o token
        localStorage.removeItem('user');  // Remove os dados do user
        navigate('/login');               // Redireciona
    };

    // Se ainda estiver verificando (previne flash de conteúdo antes do redirecionamento)
    if (!user && !localStorage.getItem('token')) return null;

    return (

        <>
            <div className="max-w-6xl mx-auto px-4">
                <header className="flex justify-between items-center py-8">
                    <h2 className="text-5xl font-bold">
                        Bem-vindo, {user?.nome || 'Usuário'}!
                    </h2>

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-medium transition-colors cursor-pointer"
                    >
                        Sair
                    </button>
                </header>

                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <p className="text-gray-600">Painel de controle </p>
                    <p className="mt-2 font-mono text-sm text-green-600">Status: Autenticado via JWT</p>
                </div>

                <GestarDados />
            </div>
        </>
    );
};

export default Dashboard;