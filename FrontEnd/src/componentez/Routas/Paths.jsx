import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListaContatos from '../ListaContatos/ListaContatos';
import Login from '../Login/Login';

const Paths = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/listaContatos" element={<ListaContatos />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default Paths
