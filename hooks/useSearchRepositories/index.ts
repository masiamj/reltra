/**
 * This hook abstracts application logic of searching repositories
 * into a clean, minimal, testable interface.
 *
 * Consumers of this hook don't have to know anything about underlying
 * implementation details of data sources, debouncing, error handling, etc.
 *
 * I personally love this pattern to decouple UI-layer and application-logic-layer
 * concerns.
 */
import { debounce, DebouncedFunc } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { RepoSearchResult, searchRepositories } from '@lib/github';
import useLatch from '@hooks/useLatch';

interface UseSearchRepositories {
  error: Error | null;
  hasSearched: boolean;
  loading: boolean;
  search: DebouncedFunc<(query: string) => Promise<void>>;
  searchResults: Array<RepoSearchResult>;
}

const useSearchRepositories = (): UseSearchRepositories => {
  const { on: hasSearched, trip } = useLatch();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Array<RepoSearchResult>>(
    []
  );

  const _search = useCallback(async (query = '') => {
    if (!!query) {
      try {
        trip();
        setLoading(true);
        const { results = [] } = await searchRepositories({ query });
        setSearchResults(results);
        setLoading(false);
      } catch (_error) {
        setLoading(false);
        setError(_error as Error);
      }
    }
  }, []);

  const search = useMemo(() => debounce(_search, 500), [_search]);

  return {
    error,
    hasSearched,
    loading,
    search,
    searchResults,
  };
};

export default useSearchRepositories;
