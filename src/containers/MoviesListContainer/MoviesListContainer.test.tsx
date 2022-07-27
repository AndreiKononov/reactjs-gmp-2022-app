import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as fromUseMovies from '../../hooks/useMovies';
import { movies } from '../../mocks/movies';
import { MoviesListContainer } from './MoviesListContainer';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('MoviesListContainer', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({
    selectedMovie: {
      movies: [],
      isError: false,
      isLoading: false,
    },
  });

  const mockedPush = jest.fn();

  beforeEach(() => {
    jest.spyOn(store, 'dispatch').mockImplementation();
  });

  beforeEach(() => {
    useRouter.mockImplementationOnce(() => ({
      pathname: '/search',
      query: { sortBy: 'release_date', movie: '55555' },
      push: mockedPush,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading indicator', () => {
    jest.spyOn(fromUseMovies, 'useMovies').mockReturnValue({
      movies: [],
      isError: false,
      isLoading: true,
    });

    const { getByText } = renderMoviesListContainerInProvider();

    const loadingIndicator = getByText('Loading...');
    expect(loadingIndicator).toBeInTheDocument();
  });

  it('should show error indicator', () => {
    jest.spyOn(fromUseMovies, 'useMovies').mockReturnValue({
      movies: [],
      isError: true,
      isLoading: false,
    });

    const { getByText } = renderMoviesListContainerInProvider();

    const errorIndicator = getByText('Fetching Error!');
    expect(errorIndicator).toBeInTheDocument();
  });

  it('should show movies list', () => {
    jest.spyOn(fromUseMovies, 'useMovies').mockReturnValue({
      movies: movies,
      isError: false,
      isLoading: false,
    });

    const { getAllByRole } = renderMoviesListContainerInProvider();

    const moviesList = getAllByRole('listitem');
    expect(moviesList.length).toBe(movies.length);
  });

  /**
   * Uncomment to test error boundary: commented out as it throws errors to test console
   *
   it('should activate error boundary on movies list error', () => {
     jest.spyOn(fromUseMovies, 'useMovies').mockReturnValue({
       movies: [...movies, null] as Movie[],
       isError: false,
       isLoading: false,
     });
     const { getByText } = renderMoviesListContainerInProvider();
     const errorBoundary = getByText(`Something went wrong with MoviesListContainer!`);
     expect(errorBoundary).toBeInTheDocument();
   });
   */

  function renderMoviesListContainerInProvider() {
    return render(
      <Provider store={store}>
        <MoviesListContainer />
      </Provider>
    );
  }
});
