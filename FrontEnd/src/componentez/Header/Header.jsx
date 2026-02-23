import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight text-blue-600">
                        Soft<span className="text-gray-900">Contato</span>
                    </h1>
                </div>

                {/* Navegação */}
                <nav className="nav">
                    <ul className="flex items-center gap-6 text-sm font-medium">
                        <li>
                            <Link
                                to="/listaContatos"
                                className="text-gray-600 transition-colors hover:text-blue-600"
                            >
                                Lista de contatos
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/login"
                                className="rounded-full bg-blue-600 px-5 py-2 text-white transition-all hover:bg-blue-700 active:scale-95"
                            >
                                Login
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;