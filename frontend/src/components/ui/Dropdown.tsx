import React, { useState } from 'react'; 
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { motion } from 'framer-motion'; 
import { AlignLeft } from 'lucide-react'; // Ensure this import is present

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
        <Menu as="div" className="relative inline-block w-48">
            <MenuButton className="w-full px-2 py-1 text-left bg-white border rounded shadow focus:outline-none flex items-center text-sm">
                {({ open }) => (
                    <>
                        <AlignLeft className="mr-2" />
                        <span>{open ? "Close" : selected || placeholder}</span>
                    </>
                )}
            </MenuButton>
            <MenuItems as={motion.div} 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-10 w-full mt-1 bg-white border rounded shadow text-sm"
            >
                {options.map(option => (
                    <MenuItem key={option.value}>
                        <div
                            onClick={() => handleSelect(option.label)} 
                            className="px-2 py-1 cursor-pointer data-[focus]:bg-gray-100"
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