// src/EditableTextbox.js
import React, { useState } from 'react';
import Modal from './Modal';

const EditableTextBox = () => {
    const [text, setText] = useState('This is the default text that can be edited. Click "Edit" to modify it.');
    const [isModalOpen, setModalOpen] = useState(false);
    const [tempText, setTempText] = useState(text); // For storing text during editing

    const handleSave = () => {
        setText(tempText); // Update the main text state with the edited text
        setModalOpen(false); // Close the modal
    };

    return (
        <div className="flex flex-col h-full relative p-4 bg-gray-100 rounded-lg">
            <div 
                className="text-gray-700 leading-relaxed mb-2 cursor-pointer" 
                onClick={() => {
                    setTempText(text); // Set temp text for editing
                    setModalOpen(true); // Open the modal when text is clicked
                }}
            >
                {text}
            </div>
            <button
                onClick={() => {
                    setTempText(text); // Set temp text for editing
                    setModalOpen(true);
                }}
                className="self-end px-3 py-1 text-normal rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition-colors duration-300"
            >
                Edit
            </button>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                text={tempText}
                onSave={handleSave}
                setTempText={setTempText} // Pass setTempText to modal
            />
        </div>
    );
};

export default EditableTextBox;
