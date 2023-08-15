import { describe, expect, test } from 'vitest';

import { QuoteQueryParams } from '@/app/api/quote/core';

import { cn } from '@/lib/utils';
import { getParamString } from '@/utils/base';
import { formatDateString, formatThreadCount } from '@/utils/format';

describe('utils', () => {
  test('`formatter` funcs should work as EXPECTED', () => {
    expect(formatDateString('2023-08-13T07:55:26.333+00:00')).toBe('2:55 PM - Aug 13, 2023');

    expect(formatThreadCount(0)).toBe('No Threads');
    expect(formatThreadCount(1)).toBe('01 Thread');
    expect(formatThreadCount(5)).toBe('05 Threads');
  });

  test('`cn` func should work as EXPECTED', () => {
    expect(cn('mx-auto p-4', null, undefined, false, true, 'mx-2 px-2')).toBe('p-4 mx-2 px-2');
  });

  test('`getParamString` func should work as EXPECTED', () => {
    expect(getParamString<Partial<QuoteQueryParams>>({})).toBe('');

    expect(
      getParamString<Partial<QuoteQueryParams>>({
        page: 1,
        limit: 10,
        maxLength: 100,
        minLength: 0,
        tags: '',
      }),
    ).toBe('?page=1&limit=10&maxLength=100&minLength=0&tags=');

    expect(
      getParamString<Partial<QuoteQueryParams>>({
        author: 'david',
      }),
    ).toBe('?author=david');
  });
});
