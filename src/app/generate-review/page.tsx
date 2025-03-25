"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/language-selector";
import Layout from "@/components/layout";
import ContentContainer from "@/components/content-container";
import ReviewGenerator from "@/components/review-generator";
import { useLanguage } from "@/context/language-context";

export default function GenerateReviewPage() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <Layout>
      <ContentContainer>
        <h1 className="text-2xl ml-2 font-bold mb-5 text-black">
          {t("yourReview")}
        </h1>

        <ReviewGenerator router={router} />

        <div className="mt-4">
          <Button
            variant="link"
            className="custom-link-button p-0"
            onClick={() => router.push("/keywords")}
          >
            {t("backToKeywords")}
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
