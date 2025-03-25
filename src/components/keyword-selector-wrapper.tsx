"use client";

import { useEffect } from "react";
import KeywordSelector from "@/components/keyword-selector";

type KeywordSelectorWrapperProps = {
  selectedKeywords: string[];
  setSelectedKeywords: (keywords: string[]) => void;
};

export default function KeywordSelectorWrapper({
  selectedKeywords,
  setSelectedKeywords
}: KeywordSelectorWrapperProps) {
  // Clear localStorage when component mounts, but don't reset selection state continuously
  useEffect(() => {
    // Clear localStorage only on initial mount
    localStorage.removeItem("selectedKeywords");

    // Only reset keywords on initial mount, not on every render
    // This was causing the issue where keywords couldn't be selected
  }, []); // Empty dependency array so it only runs once

  return (
    <KeywordSelector
      selectedKeywords={selectedKeywords}
      setSelectedKeywords={setSelectedKeywords}
    />
  );
}
