"use client";

import { useEffect, useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCwIcon, ExternalLinkIcon, CheckIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/language-context";
import CompanySelector from "./company/CompanySelector";

interface Company {
  id: string;
  name: string;
  description: string;
  logo_url: string | null;
  address: string;
  membership_type: string;
  keywords: string[];
  google_review_link: string;
}

type ReviewGeneratorProps = {
  router: AppRouterInstance;
};

export default function ReviewGenerator({ router }: ReviewGeneratorProps) {
  const { language, t } = useLanguage();
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [generatedReview, setGeneratedReview] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateReview = async (company: Company) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keywords: company.keywords,
          language: language,
          companyId: company.id
        }),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedReview(data.review);
      } else {
        setError(data.error || "Failed to generate review");
      }
    } catch (error) {
      console.error("Error generating review:", error);
      setError("Failed to generate review. Please try again.");
    } finally {
      setIsLoading(false);
      setIsRegenerating(false);
    }
  };

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    generateReview(company);
  };

  const handleRegenerateReview = () => {
    if (selectedCompany) {
      setIsRegenerating(true);
      generateReview(selectedCompany);
    }
  };

  const handleGoToGoogleReviews = () => {
    if (!selectedCompany) return;

    // Copy to clipboard first
    navigator.clipboard.writeText(generatedReview);

    // Open Google Reviews direct link in a new tab
    window.open(selectedCompany.google_review_link, "_blank");

    // Redirect to thank you page
    setTimeout(() => {
      router.push("/thank-you");
    }, 1000);
  };

  if (!isClient) {
    return <div className="my-4 p-2">Loading review generator...</div>;
  }

  return (
    <>
      <div className="mb-6">
        <CompanySelector onCompanySelect={handleCompanySelect} />
      </div>

      {selectedCompany && (
        <div className="mb-4 ml-2">
          <p className="text-sm text-gray-700 font-medium mb-1">
            {t("basedOnKeywords")}
          </p>
          <p className="text-sm text-black font-bold">
            {selectedCompany.keywords.join(" • ")}
          </p>
        </div>
      )}

      <div className="mb-5 ml-2 relative">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-8 h-8 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-sm text-gray-600">
              {isRegenerating ? t("regeneratingReview") : t("generatingReview")}
            </p>
          </div>
        ) : error ? (
          <div className="text-red-500 p-4 rounded bg-red-50">
            {error}
          </div>
        ) : (
          <div className="space-y-2">
            <Label htmlFor="concerns">Your Concerns</Label>
            <Textarea
              id="concerns"
              placeholder="Enter your concerns here..."
              value={generatedReview}
              onChange={(e) => setGeneratedReview(e.target.value)}
              className="min-h-[100px] border-2 border-black text-black"
            />
          </div>
        )}
      </div>

      {!isLoading && selectedCompany && (
        <>
          <div className="mb-4 ml-2">
            <p className="text-sm text-gray-600 italic">
              {t("copyReviewInfo")}
            </p>
          </div>

          <div className="mb-6 ml-2">
            <div className="flex items-start space-x-3">
              <div className="relative mt-1">
                <Checkbox
                  id="privacyPolicy"
                  checked={privacyAccepted}
                  onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                  className="border-gray-400"
                />
                {privacyAccepted && (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                    <CheckIcon className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <Label
                  htmlFor="privacyPolicy"
                  className="text-sm text-gray-700 cursor-pointer font-medium"
                >
                  {t("privacyConsent")}
                </Label>
                <p className="text-xs text-gray-500 mt-1">
                  {t("privacyDetails")}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-2 space-y-3">
            <Button
              className="w-full custom-primary-button font-bold py-2 px-4 rounded"
              onClick={handleRegenerateReview}
              disabled={isLoading}
            >
              <RefreshCwIcon className="h-4 w-4 mr-2" />
              {t("regenerateReview")}
            </Button>

            <Button
              variant="outline"
              className="w-full custom-outline-button font-bold py-2 px-4 rounded flex justify-center items-center gap-2"
              onClick={handleGoToGoogleReviews}
              disabled={isLoading || !privacyAccepted}
              title={!privacyAccepted ? "Please accept the privacy disclaimer first" : ""}
            >
              <ExternalLinkIcon className="h-4 w-4" />
              {t("copyAndGoToGoogle")}
            </Button>
          </div>
        </>
      )}
    </>
  );
}
