"use client";

import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/language-context";

type KeywordSelectorProps = {
  selectedKeywords: string[];
  setSelectedKeywords: (keywords: string[]) => void;
};

// Keywords relevant to a healthcare experience
const availableKeywords = {
  en: [
    "Professional", "Friendly", "Caring", "Effective", "Clean",
    "Knowledgeable", "Attentive", "Thorough", "Efficient", "Welcoming",
    "Helpful", "Organized", "Compassionate", "Respectful", "Patient",
    "Gentle", "Clear", "Responsive", "Accommodating", "Understanding",
    "Empathetic", "Timely", "Modern", "Relaxing", "Skilled"
  ],
  fr: [
    "Professionnel", "Amical", "Attentionné", "Efficace", "Propre",
    "Compétent", "Attentif", "Minutieux", "Efficient", "Accueillant",
    "Serviable", "Organisé", "Compatissant", "Respectueux", "Patient",
    "Doux", "Clair", "Réactif", "Accommodant", "Compréhensif",
    "Empathique", "Ponctuel", "Moderne", "Relaxant", "Qualifié"
  ]
};

export default function KeywordSelector({
  selectedKeywords,
  setSelectedKeywords
}: KeywordSelectorProps) {
  const { language, t } = useLanguage();

  const toggleKeyword = (keyword: string) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
    } else {
      // Limit to max 5 keywords
      if (selectedKeywords.length < 5) {
        setSelectedKeywords([...selectedKeywords, keyword]);
      }
    }
  };

  // Get keywords in current language
  const currentKeywords = language === 'fr' ? availableKeywords.fr : availableKeywords.en;

  return (
    <div className="mt-2">
      <p className="text-sm text-black mb-2 ml-2 font-medium">
        {selectedKeywords.length === 0
          ? t("selectKeywordsRecommended")
          : `${t(selectedKeywords.length === 1 ? "selectedKeyword" : "selectedKeywords_plural")} ${selectedKeywords.length}`
        }
      </p>

      <div className="flex flex-wrap gap-2 mb-3">
        {currentKeywords.map((keyword) => {
          const isSelected = selectedKeywords.includes(keyword);
          return (
            <div key={keyword}>
              <Badge
                className={`
                  cursor-pointer px-3 py-2 text-sm shadow-sm
                  ${isSelected
                    ? 'bg-[#1E3A8A] hover:bg-[#15307A] text-white font-medium'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }
                  ${isSelected ? 'border border-blue-300' : 'border border-transparent'}
                `}
                onClick={() => toggleKeyword(keyword)}
              >
                {keyword}
                {isSelected && (
                  <span className="ml-1 bg-white bg-opacity-20 text-white px-1 rounded">✓</span>
                )}
              </Badge>
            </div>
          );
        })}
      </div>

      {selectedKeywords.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-700 font-medium">{t("selectedKeywords")}</p>
          <p className="text-sm text-black font-bold">
            {selectedKeywords.join(" • ")}
          </p>
        </div>
      )}
    </div>
  );
}
