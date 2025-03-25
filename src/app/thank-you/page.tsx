"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/language-selector";
import Layout from "@/components/layout";
import ContentContainer from "@/components/content-container";
import { useLanguage } from "@/context/language-context";

export default function ThankYouPage() {
  const { t } = useLanguage();

  return (
    <Layout>
      <ContentContainer>
        <h1 className="text-2xl font-bold mb-5 text-center text-black">
          {t("thankYou")}
        </h1>

        <div className="mb-5 flex justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1E3A8A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-4"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>

        <p className="text-center text-black mb-8">
          {t("feedbackSubmitted")}
        </p>

        <div className="flex justify-center">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full custom-primary-button font-bold py-2 px-8 rounded">
              {t("backToHome")}
            </Button>
          </Link>
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
