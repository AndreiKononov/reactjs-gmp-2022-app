import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { movies } from '../../mocks/movies';
import MovieListCard from './MovieListCard';

function MockModal({ title }) {
  return <div>{title}</div>;
}

jest.mock('../../components/Modal/Modal', () => MockModal);

jest.mock('../../components/EditMovieFormik/EditMovieFormik', () => {
  return () => <div>Mocked Edit Movie Form</div>;
});

jest.mock('../../components/DeleteMovieConfirm/DeleteMovieConfirm', () => {
  return () => <div>Mocked Delete Movie Confirm Form</div>;
});

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('MoviesListCard', () => {
  const movie = movies[0];
  const mockedPush = jest.fn();

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

  it('should render a movie list card with provided movie title and image', () => {
    const { getByText, getByAltText } = renderMovieListCard();

    expect(getByText(movie.title)).toBeInTheDocument();
    expect(getByAltText(`${movie.title} poster`)).toBeInTheDocument();
  });

  it('should display dropdown on context menu button click', () => {
    const { getByTitle, getByRole } = renderMovieListCard();

    const contextMenuBtn = getByTitle('context-menu-button');
    expect(contextMenuBtn).toBeInTheDocument();

    userEvent.click(contextMenuBtn);

    const dropdown = getByRole('menu');
    expect(dropdown).toBeInTheDocument();
  });

  it.skip('should display Edit Movie Modal on dropdown edit option select', async () => {
    const { getByTitle, getByRole, getByText } = renderMovieListCard();

    const contextMenuBtn = getByTitle('context-menu-button');
    expect(contextMenuBtn).toBeInTheDocument();

    userEvent.click(contextMenuBtn);

    const dropdown = getByRole('menu');
    expect(dropdown).toBeInTheDocument();

    const editOption = getByText('Edit');
    expect(editOption).toBeInTheDocument();

    userEvent.click(editOption);

    await waitFor(() => {
      expect(getByText(/Edit Movie/i)).toBeInTheDocument();
    });
  });

  it.skip('should display Delete Movie Modal on dropdown delete option select', async () => {
    const { getByTitle, getByRole, getByText } = renderMovieListCard();

    const contextMenuBtn = getByTitle('context-menu-button');
    expect(contextMenuBtn).toBeInTheDocument();

    userEvent.click(contextMenuBtn);

    const dropdown = getByRole('menu');
    expect(dropdown).toBeInTheDocument();

    const deleteOption = getByText('Delete');
    expect(deleteOption).toBeInTheDocument();

    userEvent.click(deleteOption);

    await waitFor(() => {
      expect(getByText(/Delete Movie/i)).toBeInTheDocument();
    });
  });

  it('should set movie query param and trigger scroll to top on movie select', () => {
    const { getByAltText } = renderMovieListCard();

    const movieImg = getByAltText(`${movie.title} poster`);
    expect(movieImg).toBeInTheDocument();
    userEvent.click(movieImg);

    expect(mockedPush).toHaveBeenCalledWith(
      {
        pathname: `/search`,
        query: {
          sortBy: 'release_date',
          genre: 'action',
          movie: movie.id.toString(),
        },
      },
      undefined,
      { shallow: true, scroll: true }
    );
  });

  function renderMovieListCard() {
    return render(<MovieListCard movie={movie} />);
  }
});
