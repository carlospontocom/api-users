// Modal.jsx
const ModalMensagem = ({ isOpen, message, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 transform transition-all">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Aviso</h3>
                <p className="text-gray-600 mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg transition-colors cursor-pointer"
                >
                    Fechar!
                </button>
            </div>
        </div>
    );
};

export default ModalMensagem;