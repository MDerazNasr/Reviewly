"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the types for our context
type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
};

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key) => key,
});

// Define our translations
const translations = {
  en: {
    // Home page
    "tellUsAboutExperience": "Tell us about your experience",
    "howWasExperience": "How was your experience at",
    "greatExperience": "Great experience",
    "haveConcern": "I have a concern",

    // Keywords page
    "selectKeywords": "Select keywords that describe your experience",
    "chooseKeywords": "Choose 3-5 keywords that best describe your experience at",
    "selectKeywordsRecommended": "Select keywords (3-5 recommended)",
    "selectedKeywords": "Selected keywords:",
    "selectedKeyword": "Selected keyword",
    "selectedKeywords_plural": "Selected keywords",
    "selectAtLeastOne": "Please select at least one keyword to continue",
    "continue": "Continue",
    "back": "← Back",
    "backToKeywords": "← Back to keywords",

    // Review page
    "yourReview": "Your Review",
    "basedOnKeywords": "Based on your selected keywords:",
    "generatingReview": "Generating your review...",
    "regeneratingReview": "Regenerating review...",
    "copyReviewInfo": "You can copy this review and paste it on Google, Yelp, or any other review platform.",
    "privacyConsent": "I have read and agree to the AI-generated review disclaimer.",
    "privacyDetails": "By checking this box, you acknowledge that our AI-generated content helps express your thoughts about the establishment. You can edit the review before submitting to ensure accuracy. While we strive for authenticity, we cannot guarantee complete accuracy, so please use your discretion.",
    "regenerateReview": "Regenerate Review",
    "copyAndGoToGoogle": "Copy & Go to Google Reviews",
    "submitAndFinish": "Submit & finish",

    // Concern page
    "tellUsAboutConcern": "Tell us about your concern",
    "sorryConcern": "We're sorry to hear you had a concern about your experience at",
    "describeConcern": "Please describe your concern",
    "tellWhatHappened": "Tell us what happened...",
    "submitting": "Submitting...",
    "submitConcern": "Submit Concern",
    "backToMain": "← Back to main page",

    // Thank you page
    "thankYou": "Thank You For Your Feedback",
    "feedbackSubmitted": "Your feedback has been submitted successfully. We appreciate you taking the time to share your experience.",
    "backToHome": "Back to Home",

    // Layout
    "poweredBy": "Powered by"
  },
  fr: {
    // Page d'accueil
    "tellUsAboutExperience": "Parlez-nous de votre expérience",
    "howWasExperience": "Comment s'est passée votre expérience à",
    "greatExperience": "Excellente expérience",
    "haveConcern": "J'ai une préoccupation",

    // Page de mots-clés
    "selectKeywords": "Sélectionnez des mots-clés qui décrivent votre expérience",
    "chooseKeywords": "Choisissez 3 à 5 mots-clés qui décrivent le mieux votre expérience à",
    "selectKeywordsRecommended": "Sélectionnez des mots-clés (3-5 recommandés)",
    "selectedKeywords": "Mots-clés sélectionnés :",
    "selectedKeyword": "Mot-clé sélectionné",
    "selectedKeywords_plural": "Mots-clés sélectionnés",
    "selectAtLeastOne": "Veuillez sélectionner au moins un mot-clé pour continuer",
    "continue": "Continuer",
    "back": "← Retour",
    "backToKeywords": "← Retour aux mots-clés",

    // Page d'avis
    "yourReview": "Votre Avis",
    "basedOnKeywords": "Basé sur vos mots-clés sélectionnés :",
    "generatingReview": "Génération de votre avis...",
    "regeneratingReview": "Régénération de l'avis...",
    "copyReviewInfo": "Vous pouvez copier cet avis et le coller sur Google, Yelp ou toute autre plateforme d'avis.",
    "privacyConsent": "J'ai lu et j'accepte la clause de non-responsabilité concernant les avis générés par l'IA.",
    "privacyDetails": "En cochant cette case, vous reconnaissez que notre contenu généré par IA vous aide à exprimer vos pensées sur l'établissement. Vous pouvez modifier l'avis avant de le soumettre pour garantir son exactitude. Bien que nous nous efforcions d'être authentiques, nous ne pouvons pas garantir une exactitude complète, veuillez donc faire preuve de discernement.",
    "regenerateReview": "Régénérer l'avis",
    "copyAndGoToGoogle": "Copier et aller sur Google Avis",
    "submitAndFinish": "Soumettre et terminer",

    // Page de préoccupation
    "tellUsAboutConcern": "Parlez-nous de votre préoccupation",
    "sorryConcern": "Nous sommes désolés d'apprendre que vous avez eu une préoccupation concernant votre expérience à",
    "describeConcern": "Veuillez décrire votre préoccupation",
    "tellWhatHappened": "Dites-nous ce qui s'est passé...",
    "submitting": "Soumission en cours...",
    "submitConcern": "Soumettre la préoccupation",
    "backToMain": "← Retour à la page principale",

    // Page de remerciement
    "thankYou": "Merci Pour Votre Retour",
    "feedbackSubmitted": "Vos commentaires ont été soumis avec succès. Nous vous remercions d'avoir pris le temps de partager votre expérience.",
    "backToHome": "Retour à l'accueil",

    // Mise en page
    "poweredBy": "Propulsé par"
  }
};

// Create the provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  // Try to get the language from localStorage, default to English
  const [language, setLanguageState] = useState("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true when component mounts
    setMounted(true);

    // Try to get the language from localStorage
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage && (storedLanguage === "en" || storedLanguage === "fr")) {
      setLanguageState(storedLanguage);
    }
  }, []);

  // Function to set the language and save it to localStorage
  const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem("language", newLanguage);
    }
  };

  // Translate function
  const t = (key: string): string => {
    if (!mounted) return key;

    const currentTranslations = translations[language as keyof typeof translations] || translations.en;
    return currentTranslations[key as keyof typeof currentTranslations] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
