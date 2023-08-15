// API References: https://github.com/lukePeavey/quotable or https://quotable.io

import { getParamString } from '@/utils/base';

export interface QuoteResponse {
  _id: string;
  content: string;
  author: string; // To include quotes by multiple authors, provide a pipe-separated list of author names/slugs.
  authorSlug: string;
  length: number;
  tags: string[]; // separated by a comma "," (AND) or a pipe "|" (OR)
}

export interface QuoteQueryParams extends Record<string, any> {
  page: number;
  limit: number;
  maxLength: number;
  minLength: number;
  tags: string;
  author: string;
  authorId: string;
  sortBy: 'dateAdded' | 'dateModified' | 'author' | 'content';
  order: 'asc' | 'desc';
}

export const getRandomQuote = async (params?: Partial<QuoteQueryParams>) => {
  try {
    const paramString = getParamString<Partial<QuoteQueryParams>>(params);

    const res = await fetch(`https://api.quotable.io/random${paramString}`);
    const data = await res.json();

    return data;
  } catch (err) {
    return { error: err };
  }
};
