import { generateReview } from '../services/openai-service.js';
import { saveReview, getCompany } from '../services/supabase-service.js';

export async function processReviewGeneration(requestData) {
  try {
    const { companyId, language } = requestData;

    // Get company details
    const companyResult = await getCompany(companyId);
    if (!companyResult.success) {
      throw new Error(companyResult.error);
    }

    const company = companyResult.data;

    // Generate review using OpenAI
    const reviewResult = await generateReview(company, company.keywords, language);
    if (!reviewResult.success) {
      throw new Error(reviewResult.error);
    }

    const { review, cost } = reviewResult.data;

    // Save the review to the database
    const saveResult = await saveReview({
      review,
      keywords: company.keywords,
      language,
      companyId,
      cost
    });

    if (!saveResult.success) {
      throw new Error(saveResult.error);
    }

    return {
      success: true,
      data: saveResult.data[0]
    };
  } catch (error) {
    console.error('Error processing review generation:', error);
    return {
      success: false,
      error: error.message
    };
  }
} 