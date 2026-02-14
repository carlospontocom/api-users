import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Recriando from '../Modelo-de-atualizar/Recriando';
import Login from '../Login/Login.jsx';
import Header from '../Header/Header.jsx';

const Paths = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Recriando />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Paths;