import { generateReview } from "../services/openai-service.js";
import { saveReview, getCompany } from "../services/supabase-service.js";

export async function processReviewRequest(requestData) {
  try {
    const { keywords, language, companyId } = requestData;

    // Get company details
    const companyResult = await getCompany(companyId);
    if (!companyResult.success) {
      throw new Error('Company not found');
    }

    // Generate the review
    const review = await generateReview(keywords, language);

    // Save the review with company reference
    const saveResult = await saveReview({
      review,
      keywords,
      language,
      companyId,
      cost: 0.10 // You can adjust this based on membership type or other factors
    });

    if (!saveResult.success) {
      console.error('Failed to save review:', saveResult.error);
    }

    return { review, success: true };
  } catch (error) {
    console.error("Error processing review request:", error);
    return { error: "Failed to generate review", success: false };
  }
}
