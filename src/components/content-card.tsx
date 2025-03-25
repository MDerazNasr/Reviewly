"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type ContentCardProps = {
  children: ReactNode;
};

export default function ContentCard({ children }: ContentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-md w-full mx-4 sm:mx-6 p-6 bg-white shadow-lg rounded-xl text-left"
    >
      {children}
    </motion.div>
  );
}
