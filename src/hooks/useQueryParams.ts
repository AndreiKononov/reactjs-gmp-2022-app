import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { QueryParams } from '../models/QueryParams';
import { initialQueryParams } from '../utils/initialQueryParams';

export const useQueryParams = (): QueryParams => {
  const router = useRouter();

  const sortBy = (router.query.sortBy as string) ?? null;
  const filter = (router.query.genre as string) ?? null;
  const search = (router.query.search as string) ?? null;

  return useMemo(
    () => ({
      ...initialQueryParams,
      search,
      sortBy,
      filter,
    }),
    [search, sortBy, filter]
  );
};
