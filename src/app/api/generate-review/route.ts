import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { keywords, language } = body;

    // Call our backend API
    const response = await fetch(`${process.env.BACKEND_URL}/api/generate-review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keywords, language }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in generate-review API route:', error);
    return NextResponse.json(
      { error: 'Failed to generate review', success: false },
      { status: 500 }
    );
  }
} 