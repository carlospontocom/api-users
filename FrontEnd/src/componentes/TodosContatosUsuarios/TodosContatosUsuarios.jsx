
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

const TodosContatosUsuarios = () => {

    const [listaContatos, setListaContatos] = useState([])


    const atualizar = async () => {
        try {
            const response = await axios.get("http://localhost:8080/usuarios");
            setListaContatos(response.data)
        } catch (error) {
            console.error("Erro ao buscar usários", error);
        }
    };

    useEffect(() => {
        atualizar();
    }, [listaContatos]);

    const deletarContato = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/usuarios/${id}`);
            alert("Deletado com sucesso");
            atualizar();
        } catch (error) {
            console.log("Erro na tentativa de deleção", error)
        }
    }

    return (
        <section className="bg-blue-400 pb-8 h-min-screen">
            <h2 className="text-center text-5xl pb-5 pt-9 px-3 font-bold mb-6 text-white">Lista de usuários <br />cadastrados</h2>
            <div className="max-w-5xl mx-auto px-4  grid grid-cols-3 gap-4">
                {
                    listaContatos.map(cadaUsuario => (
                        <div key={cadaUsuario._id} className="rounded-md p-4 text-center bg-gray-200">
                            <p>{cadaUsuario.nome}</p>
                            <p>{cadaUsuario.email}</p>
                            <p>{cadaUsuario.cpf}</p>
                            <div className="flex gap-4">
                                <button className="
                                    cursor-pointer bg-red-500 px-2 py-2 text-white rounded-md mt-5"
                                    onClick={() => deletarContato(cadaUsuario._id)}>
                                    Deletar
                                </button>
                                <button className="cursor-pointer bg-orange-400 px-2 py-2 text-white rounded-md mt-5"
                                    onClick={() => deletarContato(cadaUsuario._id)}>
                                    Editar
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default TodosContatosUsuarios
