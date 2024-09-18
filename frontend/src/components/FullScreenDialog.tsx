import React from 'react';
import { Dialog, DialogPanel, DialogTitle, Description } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';

interface FullScreenDialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
}

const FullScreenDialog: React.FC<FullScreenDialogProps> = ({ isOpen, onClose, title, description }) => {
    const variants = {
        open: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
            },
        },
        closed: {
            opacity: 0,
            scale: 0,
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
            },
        },
        exit: {
            opacity: 0,
            scale: 1,
            height: 1,
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
            },
        },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog open={isOpen} onClose={onClose} className="relative z-50">
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="exit"
                            variants={variants}
                            className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg overflow-hidden"
                        >
                            <DialogPanel>
                                <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
                                <Description className="mt-2">{description}</Description>
                                <div className="mt-4 flex justify-end">
                                    <button
                                        onClick={onClose}
                                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </DialogPanel>
                        </motion.div>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export default FullScreenDialog;