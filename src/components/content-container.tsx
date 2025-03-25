"use client";

import { ReactNode } from "react";

type ContentContainerProps = {
  children: ReactNode;
};

export default function ContentContainer({ children }: ContentContainerProps) {
  return (
    <div className="max-w-md w-full mx-4 sm:mx-6 p-6 bg-white shadow-lg rounded-xl text-left">
      {children}
    </div>
  );
}
