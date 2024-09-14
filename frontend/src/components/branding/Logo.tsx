import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoTextHeader } from './LogoText';

const Logo = () => {
    const [textIndex, setTextIndex] = useState(0);
    const texts = [
        'NewGrad.works',
        'NewGrad.works'
    ];
    const displayTimes = [5000, 3000];

    useEffect(() => {
        const cycleText = () => {
            setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        };

        const timer = setTimeout(cycleText, displayTimes[textIndex]);

        return () => clearTimeout(timer);
    }, [textIndex]);

    return (
        <div className="text-2xl font-extrabold font-nunito">
            <AnimatePresence mode="wait">
                <motion.span
                    key={textIndex}
                    className="bg-clip-text drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                >
                    <LogoTextHeader />
                </motion.span>
            </AnimatePresence>
        </div>
    );
};

export default Logo;
