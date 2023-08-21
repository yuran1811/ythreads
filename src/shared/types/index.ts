export * from './community';
export * from './socket';
export * from './thread';
export * from './user';

export interface SearchParamsProps<
  T extends Record<string, string | undefined> = Record<string, string | undefined>,
> {
  searchParams: T;
}

export interface ParamsProps<T> {
  params: T;
}

export interface ErrorPageProps<T extends Error & { digest?: string } = Error & { digest?: string }> {
  error: T;
  reset: () => void;
}
