import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListaContatos from '../ListaContatos/ListaContatos';
import Login from '../Login/Login';
import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';

const Paths = () => {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/listaContatos" element={<ListaContatos />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default Paths
