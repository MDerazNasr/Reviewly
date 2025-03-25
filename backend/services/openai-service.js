import OpenAI from "openai";
import 'dotenv/config';

const client = new OpenAI();

export async function generateReview(company, keywords, language = 'English') {
  try {
    const prompt = `Write a positive, authentic-sounding review for ${company.name} in ${language}. 
    Use these keywords naturally: ${keywords.join(', ')}. 
    Make it sound like a real customer experience.`;

    const completion = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const review = completion.choices[0].message.content.trim();
    const cost = (completion.usage.total_tokens / 1000) * 0.03; // GPT-4 cost per 1K tokens

    return {
      success: true,
      data: {
        review,
        cost
      }
    };
  } catch (error) {
    console.error('Error generating review:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
