"use client";

import { useState, useEffect } from "react";
import { GlobeIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/context/language-context";

const languages = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" }
];

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted (client-side) before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[80px] h-[32px]"></div>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1 px-3 py-2 text-sm rounded-md bg-white text-[#1E3A8A] hover:bg-gray-100 border border-gray-200 shadow-sm">
          <GlobeIcon className="w-4 h-4 relative" />
          <span className="relative">{languages.find(lang => lang.code === language)?.name || "English"}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border border-gray-200 shadow-lg">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className={`cursor-pointer text-gray-800 hover:bg-gray-100 ${language === lang.code ? "font-bold" : ""}`}
            onClick={() => setLanguage(lang.code)}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
