import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { movies } from '../../mocks/movies';
import { Movie } from '../../models/Movie';
import * as fromGetMovieFromFormValue from '../../utils/getMovieFromFormValue';
import * as moviesReducerStore from '../../store/moviesReducer';
import EditMovieFormik from './EditMovieFormik';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('EditMovieFormik', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore();
  const mockHandleClose = jest.fn();

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

  it('should render empty form when no movie is provided', () => {
    const { getByPlaceholderText } = renderEdieMovieFormikInProviderAndRouter(null);

    const titleInput = getByPlaceholderText('Title');

    expect(titleInput).toBeInTheDocument();
    expect((titleInput as HTMLInputElement).value).toBe('');
  });

  it('should render filled form when a movie is provided', () => {
    const { getByDisplayValue } = renderEdieMovieFormikInProviderAndRouter(movies[0]);

    const titleInput = getByDisplayValue(movies[0].title);

    expect(titleInput).toBeInTheDocument();
  });

  it('should dispatch createMovie action with the form value on form submit', async () => {
    const mockedMovieToSubmit = { name: 'new movie' } as Partial<Movie>;
    jest.spyOn(fromGetMovieFromFormValue, 'getMovieFromFormValue').mockReturnValue(mockedMovieToSubmit);

    const createMovieSpy = jest.spyOn(moviesReducerStore, 'createMovie').mockImplementation();
    const fetchMoviesSpy = jest.spyOn(moviesReducerStore, 'fetchMovies').mockImplementation();

    const { getByText, getByPlaceholderText, getByRole } = renderEdieMovieFormikInProviderAndRouter(null);

    userEvent.type(getByPlaceholderText('Title'), 'New Movie');
    userEvent.type(getByPlaceholderText('Select Date'), '2020-05-05');
    userEvent.type(getByPlaceholderText('https://'), 'https://url.com');
    userEvent.type(getByPlaceholderText('7.8'), '9');
    userEvent.type(getByPlaceholderText('minutes'), '100');
    userEvent.type(getByPlaceholderText('Movie description'), 'New Movie');

    userEvent.type(getByRole('combobox'), 'action');
    userEvent.click(getByText('Action'));

    userEvent.click(getByText('Submit'));

    await waitFor(() => expect(createMovieSpy).toHaveBeenCalledWith(mockedMovieToSubmit));
    expect(mockHandleClose).toHaveBeenCalled();
    expect(fetchMoviesSpy).toHaveBeenCalled();
  });

  function renderEdieMovieFormikInProviderAndRouter(movie: Movie | null) {
    return render(
      <Provider store={store}>
        <EditMovieFormik movie={movie} handleClose={mockHandleClose} />
      </Provider>
    );
  }
});
