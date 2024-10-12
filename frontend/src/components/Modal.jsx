// src/Modal.js
import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, text, onSave, setTempText }) => {
    if (!isOpen) return null;

    const handleSave = (e) => {
        e.preventDefault(); // Prevent default form submission
        onSave(); // Save the text
    };

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-4 w-1/3">
                <h2 className="text-xl font-semibold mb-4">Edit Text</h2>
                <textarea
                    value={text}
                    onChange={(e) => setTempText(e.target.value)} // Update text while typing
                    className="w-full h-32 border border-gray-300 p-2 rounded-lg"
                />
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="mr-2 px-4 py-2 rounded-lg bg-gray-300 text-gray-800 hover:bg-gray-400 transition-colors duration-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root') // Ensure you have a div with this ID in your index.html
    );
};

export default Modal;
