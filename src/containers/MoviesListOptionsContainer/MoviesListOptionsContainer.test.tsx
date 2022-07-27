import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as fromUseMovies from '../../hooks/useMovies';
import { sortOptions } from './sortOptions';
import { genres } from './genres';
import { MoviesListOptionsContainer } from './MoviesListOptionsContainer';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('MoviesListOptionsContainer', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({
    movies: {
      movies: [],
      isError: false,
      isLoading: false,
    },
  });

  const mockedPush = jest.fn();

  beforeEach(() => {
    jest.spyOn(fromUseMovies, 'useMovies').mockReturnValue(store.getState().movies);
  });

  beforeEach(() => {
    useRouter.mockImplementationOnce(() => ({
      pathname: '/search',
      query: { sortBy: 'release_date', genre: 'action' },
      push: mockedPush,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render filter panel, sort panel and number of movies found', () => {
    const { getByText } = renderMoviesListOptionsContainerInProvider();

    const sortPanel = getByText(/sort by/i);
    const filterPanel = getByText(/fantasy/i);
    const moviesFound = getByText(/movies found/i);

    expect(sortPanel).toBeInTheDocument();
    expect(filterPanel).toBeInTheDocument();
    expect(moviesFound).toBeInTheDocument();
  });

  it('should set sortBy query parameter on sort panel option select', () => {
    const selectedSortBy = sortOptions[1];

    const { getByText } = renderMoviesListOptionsContainerInProvider();

    const sortPanel = getByText('Release Date');
    expect(sortPanel).toBeInTheDocument();
    userEvent.click(sortPanel);

    const ratingOption = getByText(selectedSortBy.label);
    expect(ratingOption).toBeInTheDocument();
    userEvent.click(ratingOption);

    expect(mockedPush).toHaveBeenCalledWith(
      {
        pathname: `/search`,
        query: {
          sortBy: selectedSortBy.value,
          genre: 'action',
        },
      },
      undefined,
      { shallow: true }
    );
  });

  it('should set genre query parameter on genre panel option select', () => {
    const selectedGenre = genres[3];

    const { getByText } = renderMoviesListOptionsContainerInProvider();

    const genrePanelButton = getByText(selectedGenre.label);
    expect(genrePanelButton).toBeInTheDocument();
    userEvent.click(genrePanelButton);

    expect(mockedPush).toHaveBeenCalledWith(
      {
        pathname: `/search`,
        query: {
          sortBy: 'release_date',
          genre: selectedGenre.value,
        },
      },
      undefined,
      { shallow: true }
    );
  });

  it('should delete genre query parameter on "All" genre panel option select', () => {
    const selectedGenre = genres[0];

    const { getByText } = renderMoviesListOptionsContainerInProvider();

    const genrePanelButton = getByText(selectedGenre.label);
    expect(genrePanelButton).toBeInTheDocument();
    userEvent.click(genrePanelButton);

    expect(mockedPush).toHaveBeenCalledWith(
      {
        pathname: `/search`,
        query: {
          sortBy: 'release_date',
        },
      },
      undefined,
      { shallow: true }
    );
  });

  function renderMoviesListOptionsContainerInProvider() {
    return render(
      <Provider store={store}>
        <MoviesListOptionsContainer />
      </Provider>
    );
  }
});
