import { NextResponse } from 'next/server';
import { getRandomQuote } from './core';

export const GET = async () => {
  try {
    const randomQuote = await getRandomQuote();
    const {} = randomQuote;

    return NextResponse.json(randomQuote);
  } catch (error) {
    return NextResponse.json({ error });
  }
};
