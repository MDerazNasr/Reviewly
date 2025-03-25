"use client";

import { ReactNode, useEffect, useState } from "react";
import SafeImage from "@/components/ui/safe-image";
import { useLanguage } from "@/context/language-context";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  // Only render complete component after hydration is complete
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return simplified version for server-side rendering
    return (
      <main className="flex min-h-screen flex-col items-center bg-[#1E3A8A] py-16">
        <div className="w-full flex justify-center items-start">
          {children}
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#1E3A8A] py-16">
      {/* Content section - positioned higher on the page */}
      <div className="w-full flex justify-center items-start">
        {children}
      </div>

      {/* Powered by Revues section - positioned right under the content box */}
      <div className="flex flex-col items-center mt-8">
        <p className="text-white text-sm mb-2">{t("poweredBy")}</p>
        <SafeImage
          src="/images/reviewly.png"
          alt="reviewly"
          width={180}
          height={108}
          priority={true}
        />
      </div>
    </main>
  );
}
