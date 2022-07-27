import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import { movies } from '../../mocks/movies';
import * as useSelectedMovieModule from '../../hooks/useSelectedMovie';
import HeroContainer from './HeroContainer';

jest.mock('../../components/Modal/Modal', () => {
  return () => <div>Mocked Modal</div>;
});

jest.mock('../../components/EditMovieFormik/EditMovieFormik', () => {
  return () => <div>Mocked Edit Movie Form</div>;
});

jest.mock('../../components/MovieCardSelectedContainer/MovieCardSelectedContainer', () => {
  return () => <div>Mocked Selected Movie Container</div>;
});

jest.mock('../../components/SearchForm/SearchForm', () => {
  return () => <div>Mocked Search Form</div>;
});

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('HeroContainer', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({
    selectedMovie: {
      movie: null,
      isError: false,
      isLoading: false,
    },
  });

  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      pathname: '/search',
      query: { sortBy: 'release_date', genre: 'action' },
      push: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(store, 'dispatch').mockImplementation();
  });

  it('should display search form when there is no selected movie in store', () => {
    jest.spyOn(useSelectedMovieModule, 'useSelectedMovie').mockReturnValue(store.getState().selectedMovie);

    const { getByText, queryByText } = renderInMockedStoreProvider();

    expect(getByText('Mocked Search Form')).toBeInTheDocument();
    expect(queryByText('Mocked Selected Movie Container')).toBeNull();
  });

  it('should display selected movie card when there is selected movie in store', () => {
    jest.spyOn(useSelectedMovieModule, 'useSelectedMovie').mockReturnValue({
      movie: movies[0],
      isError: false,
      isLoading: false,
    });

    const { getByText, queryByText } = renderInMockedStoreProvider();

    expect(getByText('Mocked Selected Movie Container')).toBeInTheDocument();
    expect(queryByText('Mocked Search Form')).toBeNull();
  });

  it.skip('should display add movie modal when add movie button is clicked', async () => {
    jest.spyOn(useSelectedMovieModule, 'useSelectedMovie').mockReturnValue(store.getState().selectedMovie);

    const { getByText, queryByText } = renderInMockedStoreProvider();

    expect(queryByText('Mocked Modal')).toBeNull();

    const addMovieButton = getByText(/add movie/i);
    expect(addMovieButton).toBeInTheDocument();
    userEvent.click(addMovieButton);

    await waitFor(() => {
      expect(getByText('Mocked Modal')).toBeInTheDocument();
    });
  });

  function renderInMockedStoreProvider() {
    return render(
      <Provider store={store}>
        <HeroContainer />
      </Provider>
    );
  }
});
