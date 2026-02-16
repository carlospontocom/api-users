import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Recriando from '../Modelo-de-atualizar/Recriando';
import Login from '../Login/Login.jsx';
import Header from '../Header/Header.jsx';
import Dashboard from '../Dashboard/Dashboard.jsx';

const Paths = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Recriando />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Paths;