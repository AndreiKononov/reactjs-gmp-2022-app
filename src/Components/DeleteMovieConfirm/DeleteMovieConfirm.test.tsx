import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as moviesReducerStore from '../../store/moviesReducer';
import { movies } from '../../mocks/movies';
import DeleteMovieConfirm from './DeleteMovieConfirm';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('DeleteMovieConfirm', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore();

  beforeEach(() => {
    jest.spyOn(store, 'dispatch').mockImplementation();
  });

  beforeEach(() => {
    useRouter.mockImplementationOnce(() => ({
      query: { sortBy: 'release_date' },
      push: jest.fn(),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Delete movie form', () => {
    const handleClose = jest.fn();

    const { getByText } = renderFormWithinRouterAndStoreProvider(movies[0].id, handleClose);

    expect(getByText('Are you sure you want to delete this movie?')).toBeInTheDocument();
  });

  it('should dispatch deleteMovieById, fetchMovies and call handleClose on successful delete request', async () => {
    const handleClose = jest.fn();
    const deleteMovieByIdSpy = jest.spyOn(moviesReducerStore, 'deleteMovieById');
    const fetchMoviesSpy = jest.spyOn(moviesReducerStore, 'fetchMovies');

    const { getByText } = renderFormWithinRouterAndStoreProvider(movies[0].id, handleClose);

    const button = getByText('Confirm');
    expect(button).toBeInTheDocument();

    userEvent.click(button);

    await waitFor(() => {
      expect(deleteMovieByIdSpy).toHaveBeenCalledWith(movies[0].id);
    });
    expect(handleClose).toHaveBeenCalled();
    expect(fetchMoviesSpy).toHaveBeenCalled();
  });

  it('should NOT dispatch fetchMovies and call handleClose on erroneous delete request', async () => {
    const handleClose = jest.fn();
    const deleteMovieByIdSpy = jest.spyOn(moviesReducerStore, 'deleteMovieById');
    const fetchMoviesSpy = jest.spyOn(moviesReducerStore, 'fetchMovies');
    jest.spyOn(store, 'dispatch').mockReturnValue(Promise.reject('error'));

    const { getByText } = renderFormWithinRouterAndStoreProvider(movies[0].id, handleClose);

    const button = getByText('Confirm');
    expect(button).toBeInTheDocument();

    userEvent.click(button);

    await waitFor(() => {
      expect(deleteMovieByIdSpy).toHaveBeenCalledWith(movies[0].id);
    });
    expect(handleClose).not.toHaveBeenCalled();
    expect(fetchMoviesSpy).not.toHaveBeenCalled();
  });

  function renderFormWithinRouterAndStoreProvider(movieId: number, handleCloseFn: () => void) {
    return render(
      <Provider store={store}>
        <DeleteMovieConfirm movieId={movieId} handleClose={handleCloseFn} />
      </Provider>
    );
  }
});
