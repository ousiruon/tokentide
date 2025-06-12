import { useEffect, useState } from "react";
import type { PreHeader } from "./BeforeHeader";
import { motion, AnimatePresence } from "motion/react";

const BeforeHeaderMobile = ({ content }: { content: PreHeader[] }) => {
  const [currentElement, setCurrentElement] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentElement((prev) => (prev + 1) % content.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [content.length]);

  return (
    <div className="flex md:hidden items-center gap-1">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentElement}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-1"
        >
          <div className="font-semibold">{content[currentElement].title}:</div>
          <div className="text-secondary-light dark:text-bg-dark font-bold">
            {content[currentElement].value}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BeforeHeaderMobile;
