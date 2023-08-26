import { NextResponse } from 'next/server';
import { QuoteQueryParams, QuoteResponse, getRandomQuote } from './core';

export const GET = async (request: Request) => {
  try {
    const searchParams = new URL(request.url).searchParams;

    const params: Partial<QuoteQueryParams> = {};

    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    const randomQuote = await getRandomQuote(params);
    const { author, content, _id, length, ...others } = randomQuote as QuoteResponse;

    return NextResponse.json({ author, content, ...others });
  } catch (error) {
    return NextResponse.json({ error });
  }
};

export const dynamic = 'force-dynamic';
