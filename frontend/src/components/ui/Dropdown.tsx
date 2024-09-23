import React, { useState } from 'react'; // Import useState
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { motion } from 'framer-motion'; // Import framer-motion

interface DropdownProps {
    options: { value: string; label: string }[];
    onSelect: (value: string) => void;
    placeholder?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, placeholder = "Select an option" }) => {
    const [selected, setSelected] = useState<string | null>(null); // Add state for selected option

    const handleSelect = (label: string) => {
        setSelected(label); 
        onSelect(label); 
    };

    return (
        <Menu as="div" className="relative inline-block w-64">
            <MenuButton className="w-full px-4 py-2 text-left bg-white border rounded shadow focus:outline-none">
                {({ open }) => (
                    <span>{open ? "Close" : selected || placeholder}</span> 
                )}
            </MenuButton>
            <MenuItems as={motion.div} 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full mt-1 bg-white border rounded shadow"
            >
                {options.map(option => (
                    <MenuItem key={option.value}>
                        <div
                            onClick={() => handleSelect(option.label)} 
                            className={`px-4 py-2 cursor-pointer data-[focus]:bg-gray-100`}
                        >
                            {option.label}
                        </div>
                    </MenuItem>
                ))}
            </MenuItems>
        </Menu>
    );
};

export default Dropdown;