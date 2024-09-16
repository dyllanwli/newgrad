import React from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectPopUpProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (value: string) => void;
    options: SelectOption[];
    title: string;
}

const SelectPopUp: React.FC<SelectPopUpProps> = ({ isOpen, onClose, onSelect, options, title }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={onClose}
            ></div>
            <div className="relative bg-white rounded-lg p-6 shadow-xl">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <div className="space-y-2">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                onSelect(option.value);
                                onClose();
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SelectPopUp;