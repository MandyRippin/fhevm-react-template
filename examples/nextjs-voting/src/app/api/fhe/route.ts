import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse } from '../../../types/api';

export async function GET(request: NextRequest) {
  try {
    const response: ApiResponse = {
      success: true,
      message: 'FHE API is running',
      data: {
        version: '1.0.0',
        endpoints: [
          '/api/fhe/encrypt',
          '/api/fhe/decrypt',
          '/api/fhe/compute',
          '/api/keys',
        ],
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    {
      success: false,
      error: 'Use specific endpoints: /api/fhe/encrypt, /api/fhe/decrypt, /api/fhe/compute',
    },
    { status: 400 }
  );
}
