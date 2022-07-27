import { ErrorBoundary } from '../../components/ErrorBoundary/ErrorBoundary';
import MoviesList from '../../components/MoviesList/MoviesList';
import { useMovies } from '../../hooks/useMovies';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useEffectAfterFirstMount } from '../../hooks/useEffectAfterFirstMount';
import { useQueryParams } from '../../hooks/useQueryParams';
import { fetchMovies } from '../../store/moviesReducer';

export function MoviesListContainer() {
  const dispatch = useAppDispatch();

  const { movies, isLoading, isError } = useMovies();
  const routerQueryParams = useQueryParams();

  useEffectAfterFirstMount(() => {
    dispatch(fetchMovies(routerQueryParams));
  }, [routerQueryParams]);

  const content = isError ? (
    <h1>Fetching Error!</h1>
  ) : (
    <ErrorBoundary componentName="MoviesListContainer">
      <MoviesList movies={movies}></MoviesList>
    </ErrorBoundary>
  );

  return isLoading ? <h2>Loading...</h2> : content;
}
