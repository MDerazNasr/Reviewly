"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/language-selector";
import Layout from "@/components/layout";
import ContentContainer from "@/components/content-container";
import { useLanguage } from "@/context/language-context";
import SafeImage from "@/components/ui/safe-image";

export default function Home() {
  const router = useRouter();
  const { t } = useLanguage();

  const handleGreatExperience = () => {
    router.push("/keywords");
  };

  const handleConcern = () => {
    router.push("/concern");
  };

  return (
    <Layout>
      <ContentContainer>
        <h1 className="text-2xl ml-2 font-bold mb-5 text-black">
          {t("tellUsAboutExperience")}
        </h1>

        <p className="mb-5 ml-2 text-black font-semibold">
          {t("howWasExperience")} <span className="text-black font-bold">Active Health Institute</span>?
        </p>

        <div className="mb-5 ml-2 flex justify-center">
          <SafeImage
            src="/images/active-health-logo.png"
            alt="Active Health Institute Logo"
            width={200}
            height={200}
            priority={true}
          />
        </div>

        <div className="flex-cols">
          <Button
            className="w-full custom-primary-button font-bold mt-2 py-2 px-4 rounded"
            onClick={handleGreatExperience}
          >
            <span className="flex w-full justify-center items-center">{t("greatExperience")}</span>
          </Button>

          <Button
            variant="outline"
            className="w-full bg-white hover:bg-[#F8FAFF] custom-outline-button font-bold py-2 mt-2 border rounded"
            onClick={handleConcern}
          >
            <span className="flex w-full justify-center items-center">{t("haveConcern")}</span>
          </Button>

          <div className="flex w-full justify-end mt-6">
            <div className="flex flex-row justify-center items-center text-center">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </ContentContainer>
    </Layout>
  );
}
