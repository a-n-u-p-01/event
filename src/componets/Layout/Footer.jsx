import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Footer() {
  return (
    <AnimatePresence>
      <motion.div
        key="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.5, // Duration for the fade effect
          delay: 1.3, // Delay before the fade-in starts
          ease: [0.4, 0, 0.2, 1], // Custom easing
        }}
        className="h-[5rem] bg-gray-800 flex items-center justify-center font-normal text-white"
      >
        <p className="text-center">© 2024 Anupam. All rights reserved.</p>
      </motion.div>
    </AnimatePresence>
  );
}

export default Footer;
