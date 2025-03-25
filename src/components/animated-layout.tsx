"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type AnimatedLayoutProps = {
  children: ReactNode;
};

export default function AnimatedLayout({ children }: AnimatedLayoutProps) {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#623B88]">
      {/* Logo section - stays fixed during transitions */}
      <div className="flex justify-center items-center py-10">
        <Image
          src="/images/reviewly.png"
          alt="reviewly"
          width={100}
          height={108}
          priority={true}
        />
      </div>

      {/* Animated content section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={Math.random()} // Force re-render on page change
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full flex justify-center items-start"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
