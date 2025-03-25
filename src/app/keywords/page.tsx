"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/language-selector";
import Layout from "@/components/layout";
import ContentContainer from "@/components/content-container";
import KeywordSelectorWrapper from "@/components/keyword-selector-wrapper";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/language-context";
import SafeImage from "@/components/ui/safe-image";

export default function KeywordsPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);

  // Clear keywords only on initial mount, not during selection
  useEffect(() => {
    // Clear local storage of keywords on first page load
    localStorage.removeItem("selectedKeywords");

    // Don't reset the state here, as that would interfere with user selection
    // The initial state is already empty with useState([])

    // Clean up when leaving the page
    return () => {
      // Set selected keywords in localStorage before navigating away (if user pressed continue)
      if (selectedKeywords.length > 0) {
        localStorage.setItem("selectedKeywords", JSON.stringify(selectedKeywords));
      }
    };
  }, []); // Empty dependency array ensures this only runs on mount/unmount

  const handleContinue = () => {
    if (selectedKeywords.length >= 1) {
      // Save the selected keywords to localStorage
      localStorage.setItem("selectedKeywords", JSON.stringify(selectedKeywords));
      router.push("/generate-review");
    }
  };

  return (
    <Layout>
      <ContentContainer>
        <h1 className="text-2xl ml-2 font-bold mb-5 text-black">
          {t("selectKeywords")}
        </h1>

        <p className="mb-5 ml-2 text-black font-medium">
          {t("chooseKeywords")} <span className="text-black font-bold">Active Health Institute</span>.
        </p>

        <div className="mb-5 ml-2 flex justify-center">
          <SafeImage
            src="/images/active-health-logo.png"
            alt="Active Health Institute Logo"
            width={150}
            height={150}
            priority={true}
          />
        </div>

        <KeywordSelectorWrapper
          selectedKeywords={selectedKeywords}
          setSelectedKeywords={setSelectedKeywords}
        />

        <div className="mt-6">
          <Button
            className="w-full custom-primary-button font-bold py-2 px-4 rounded"
            onClick={handleContinue}
            disabled={selectedKeywords.length < 1}
          >
            {t("continue")}
          </Button>
          {selectedKeywords.length < 1 && (
            <p className="text-sm text-red-500 mt-2 text-center">
              {t("selectAtLeastOne")}
            </p>
          )}
        </div>

        <div className="mt-4">
          <Button
            variant="link"
            className="custom-link-button p-0"
            onClick={() => router.push("/")}
          >
            {t("back")}
          </Button>
        </div>

        <div className="flex w-full justify-end mt-6">
          <div className="flex flex-row justify-center items-center text-center">
            <LanguageSelector />
          </div>
        </div>
      </ContentContainer>
    </Layout>
  );
}
