import { createCompany, getAllCompanies } from "../services/supabase-service.js";

export async function getCompanies() {
  try {
    const result = await getAllCompanies();
    if (!result.success) {
      throw new Error(result.error);
    }
    return { success: true, data: result.data };
  } catch (error) {
    console.error("Error fetching companies:", error);
    return { error: error.message, success: false };
  }
}

export async function processCompanyCreation(requestData) {
  try {
    const { name, description, address, membershipType, keywords, googleReviewLink, logoFile } = requestData;

    // Validate required fields
    if (!name || !address || !membershipType || !googleReviewLink) {
      throw new Error('Missing required fields');
    }

    // Create the company
    const result = await createCompany({
      name,
      description: description || '',
      address,
      membershipType,
      keywords: keywords || [],
      googleReviewLink,
      logoFile
    });

    if (!result.success) {
      throw new Error(result.error);
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error("Error processing company creation:", error);
    return { error: error.message, success: false };
  }
} 