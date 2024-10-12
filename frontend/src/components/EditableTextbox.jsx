// src/EditableTextbox.js
import React, { useState } from 'react';

const EditableTextBox = () => {
    const [text, setText] = useState('Edit me!');

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSave = () => {
        console.log('Saved text:', text);
    };

    return (
        <div className="flex flex-col h-full">
            <textarea
                value={text}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg p-4 w-full h-32 md:h-48 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type here..."
            />
            <div className="flex justify-end mt-2">
                <button
                    onClick={handleSave}
                    className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditableTextBox;
