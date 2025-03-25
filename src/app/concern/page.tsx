"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ConcernForm from "@/components/concern-form";
import LanguageSelector from "@/components/language-selector";
import Layout from "@/components/layout";
import ContentContainer from "@/components/content-container";
import { useLanguage } from "@/context/language-context";
import SafeImage from "@/components/ui/safe-image";

export default function ConcernPage() {
  const { t } = useLanguage();

  return (
    <Layout>
      <ContentContainer>
        <h1 className="text-2xl ml-2 font-bold mb-5 text-black">
          {t("tellUsAboutConcern")}
        </h1>

        <p className="mb-5 ml-2 text-black font-semibold">
          {t("sorryConcern")} <span className="text-black font-bold">Active Health Institute</span>.
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

        <ConcernForm />

        <div className="mt-4">
          <Link href="/">
            <Button variant="link" className="custom-link-button p-0">
              {t("backToMain")}
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
