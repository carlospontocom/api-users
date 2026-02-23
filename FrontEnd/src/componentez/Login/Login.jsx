import { useState } from 'react';
import Campo from '../Campo/Campo';
import Button from '../Button/Button';
import ModalMensagem from '../ModalMensagem/ModalMensagem';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [modalAberto, setModalAberto] = useState(false);
    const [conteudoModal, setConteudoModal] = useState('');

    const abrirAviso = (mensagem) => {
        setConteudoModal(mensagem);
        setModalAberto(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (email.trim() === "" || senha === "") {
            abrirAviso("Preencha os campos obrigatórios!");
            return;
        }

        if (senha.length < 6) {
            abrirAviso("Senha muito curta, deve ter mais de 6 caracteres!");
            return;
        }

        navigate('/dashboard');
    };

    return (
        <div className="max-w-xl mx-auto mt-8">
            <ModalMensagem
                isOpen={modalAberto}
                message={conteudoModal}
                onClose={() => setModalAberto(false)}
            />

            <form className="flex flex-col gap-5 px-2" onSubmit={handleSubmit}>
                <h2 className="text-5xl font-semibold text-center py-5 mt-4">Área de Acesso</h2>

                <Campo
                    placeholder="E-mail cadastrado"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Campo
                    placeholder="Senha de acesso"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <Button labelButton="Acessar" bgcolor="bg-green-600" />
            </form>
        </div>
    );
};

export default Login;