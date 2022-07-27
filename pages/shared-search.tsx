import Footer from '../src/components/Footer/Footer';
import { Logo } from '../src/components/Logo/Logo';
import Main from '../src/components/Main/Main';
import HeroContainer from '../src/containers/HeroContainer/HeroContainer';
import { MoviesListContainer } from '../src/containers/MoviesListContainer/MoviesListContainer';
import { MoviesListOptionsContainer } from '../src/containers/MoviesListOptionsContainer/MoviesListOptionsContainer';
import { wrapper } from '../src/store';
import { fetchMovies } from '../src/store/moviesReducer';
import { fetchMovieById } from '../src/store/selectedMovieReducer';
import { initialQueryParams } from '../src/utils/initialQueryParams';

export function Search() {
  return (
    <>
      <HeroContainer />

      <Main>
        <MoviesListOptionsContainer />
        <MoviesListContainer />
      </Main>

      <Footer>
        <Logo />
      </Footer>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context): Promise<any> => {
  const { dispatch } = store;

  const search = context.params ? (context.params.search as string) : null;
  const { sortBy, genre: filter, movie: movieId } = context.query as { sortBy: string; genre: string; movie: string };

  const promises: Promise<any>[] = [
    dispatch(
      fetchMovies({
        ...initialQueryParams,
        search,
        sortBy,
        filter,
      })
    ),
  ];

  if (movieId) {
    promises.push(dispatch(fetchMovieById(movieId)));
  }

  await Promise.all(promises);
});

export default Search;
