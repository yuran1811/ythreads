// API Reference: https://github.com/lukePeavey/quotable

export type QuoteApiParam = {
  page: number;
  limit: number;
  maxLength: number;
  minLength: number;
  tags: string;
  author: string;
  authorId: string;
  sortBy: 'dateAdded' | 'dateModified' | 'author' | 'content';
  order: 'asc' | 'desc';
};

export type QuoteType = {
  _id: string;
  // The quotation text
  content: string;
  // The full name of the author
  author: string;
  // The `slug` of the quote author
  authorSlug: string;
  // The length of quote (number of characters)
  length: number;
  // An array of tag names for this quote
  tags: string[];
};

export const getRandomQuote = async (params?: QuoteApiParam) => {
  try {
    // const paramString = !params
    //   ? ''
    //   : Object.keys(params).reduce((prev, cur, idx) => {
    //       prev += '&' + cur + '=' + params[cur];

    //       return prev;
    //     }, '?');
    const res = await fetch('https://api.quotable.io/random');
    const data = await res.json();

    return data as QuoteType;
  } catch (err) {
    return { error: err };
  }
};
