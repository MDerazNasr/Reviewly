import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Company Logo functions
export async function uploadCompanyLogo(companyName, file) {
  try {
    // Sanitize company name for use in file path
    const sanitizedCompanyName = companyName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Generate a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${sanitizedCompanyName}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('company-logos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw error;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('company-logos')
      .getPublicUrl(filePath);

    return {
      success: true,
      data: {
        path: filePath,
        url: publicUrl
      }
    };
  } catch (error) {
    console.error('Error uploading company logo:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

export async function deleteCompanyLogo(filePath) {
  try {
    const { error } = await supabase.storage
      .from('company-logos')
      .remove([filePath]);

    if (error) {
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting company logo:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Company functions
export async function getCompany(companyId) {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', companyId)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching company:', error);
    return { success: false, error: error.message };
  }
}

export async function updateCompany(companyId, updates) {
  try {
    const { data, error } = await supabase
      .from('companies')
      .update(updates)
      .eq('id', companyId)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error updating company:', error);
    return { success: false, error: error.message };
  }
}

export async function createCompany(companyData) {
  try {
    const { name, description, address, membershipType, keywords, googleReviewLink, logoFile } = companyData;

    // First, upload the logo if provided
    let logoUrl = null;
    if (logoFile) {
      const uploadResult = await uploadCompanyLogo(name, logoFile);
      if (!uploadResult.success) {
        throw new Error(uploadResult.error);
      }
      logoUrl = uploadResult.data.url;
    }

    // Then create the company record
    const { data, error } = await supabase
      .from('companies')
      .insert([
        {
          name,
          description,
          address,
          membership_type: membershipType,
          keywords: keywords ? keywords.split(',').map(k => k.trim()) : [],
          google_review_link: googleReviewLink,
          logo_url: logoUrl
        }
      ])
      .select()
      .single();

    if (error) {
      // If there's an error and we uploaded a logo, delete it
      if (logoUrl) {
        const logoPath = logoUrl.split('/').slice(-2).join('/');
        await deleteCompanyLogo(logoPath);
      }
      throw error;
    }

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error creating company:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

export async function updateCompanyKeywords(companyId, keywords) {
  return updateCompany(companyId, { keywords });
}

// Review functions
export async function saveReview({ review, keywords, language, companyId, cost = 0.10 }) {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          review_text: review,
          keywords: keywords,
          language: language,
          company_id: companyId,
          cost: cost,
          created_at: new Date().toISOString(),
        }
      ])
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving review:', error);
    return { success: false, error: error.message };
  }
}

export async function getCompanyReviews(companyId) {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('company_id', companyId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching company reviews:', error);
    return { success: false, error: error.message };
  }
}

export async function getReviewStats(companyId) {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('reviews_generated, reviews_cost')
      .eq('id', companyId)
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error fetching review stats:', error);
    return { success: false, error: error.message };
  }
}

export async function getAllCompanies() {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('name');

    if (error) {
      throw error;
    }

    return {
      success: true,
      data
    };
  } catch (error) {
    console.error('Error fetching companies:', error);
    return {
      success: false,
      error: error.message
    };
  }
} 