import { NextResponse } from 'next/server';
import { QuoteType, getRandomQuote } from './core';

export const GET = async (request: Request) => {
  try {
    const randomQuote = await getRandomQuote();
    const { author, content } = randomQuote as QuoteType;

    return NextResponse.json({ author, content });
  } catch (error) {
    return NextResponse.json({ error });
  }
};
