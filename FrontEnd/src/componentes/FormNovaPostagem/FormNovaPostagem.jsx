
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Campos from '../Campos/Campos';
import axios from 'axios';

const FormNovaPostagem = () => {
    const navigate = useNavigate();

    const [dadosPost, setDadosPost] = useState({
        titulo: "",
        descricao: "",
        imagem: "",
        categoria_id: ""
    });

    const [categorias, setCategorias] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token) {
            navigate('/login');
            return;
        }

        if (userData) {
            const usuario = JSON.parse(userData);
            setUser(usuario);
        }

        // Buscar categorias do backend
        const fetchCategorias = async () => {
            try {
                const res = await axios.get("http://localhost:8080/categorias");
                setCategorias(res.data);
            } catch (err) {
                console.error("Erro ao buscar categorias:", err);
            }
        };

        fetchCategorias();
    }, [navigate]);

    // Atualiza os campos dinamicamente
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDadosPost((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Envia para o backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            const postData = {
                ...dadosPost,
                autor_id: user.id
            };

            await axios.post("http://localhost:8080/posts", postData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Postagem criada com sucesso!");
            navigate("/posts");
        } catch (err) {
            console.error("Erro ao criar postagem:", err);
            alert("Erro ao criar postagem");
        }
    };

    return (
        <div>
            <form className="mt-9" onSubmit={handleSubmit}>

                <Campos
                    type="text"
                    name="titulo"
                    placeholder="Título"
                    value={dadosPost.titulo}
                    onChange={handleChange}
                />

                <Campos
                    type="text"
                    name="descricao"
                    placeholder="Descrição"
                    value={dadosPost.descricao}
                    onChange={handleChange}
                />

                <Campos
                    type="text"
                    name="imagem"
                    placeholder="URL da Imagem"
                    value={dadosPost.imagem}
                    onChange={handleChange}
                />

                {/* Select de categorias */}
                <select
                    name="categoria_id"
                    value={dadosPost.categoria_id}
                    onChange={handleChange}
                    className="p-2 border rounded mt-2"
                >
                    <option value="">Selecione uma categoria</option>
                    {categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.nome}
                        </option>
                    ))}
                </select>

                <button type="submit" className="p-4 bg-green-500 text-white mt-4">
                    Salvar Postagem
                </button>
            </form>
        </div>
    );
};

export default FormNovaPostagem;
