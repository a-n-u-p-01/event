import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Top from "./Top";
import Middle from "./Middle";



function Home() {

  return (
    <div className="ml-24 mr-24">
      <AnimatePresence>
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.5, // Increased duration for smoother transition
            ease: [0.4, 0, 0.2, 1], // Custom easing for a smoother feel
          }}
        >
          <Top />
          <Middle />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Home;
