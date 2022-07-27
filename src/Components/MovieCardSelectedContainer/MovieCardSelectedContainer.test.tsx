import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { movies } from '../../mocks/movies';
import MovieCardSelectedContainer from './MovieCardSelectedContainer';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('MovieCardSelectedContainer', () => {
  const mockedPush = jest.fn();

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
    const { getByText } = render(<MovieCardSelectedContainer movie={null} isLoading={true} isError={false} />);

    const loadingIndicator = getByText('Loading...');
    expect(loadingIndicator).toBeInTheDocument();
  });

  it('should show error indicator', () => {
    const { getByText } = render(<MovieCardSelectedContainer movie={null} isLoading={false} isError={true} />);

    const errorIndicator = getByText('Fetching Error!');
    expect(errorIndicator).toBeInTheDocument();
  });

  it('should show selected movie', () => {
    const selectedMovie = movies[0];

    const { getByAltText } = render(<MovieCardSelectedContainer movie={selectedMovie} isLoading={false} isError={false} />);

    const selectedMovieImg = getByAltText(`${selectedMovie.title} poster`);
    expect(selectedMovieImg).toBeInTheDocument();
  });

  it('should delete movie query parameter on search button clicked', () => {
    const selectedMovie = movies[0];

    const { getByRole } = render(<MovieCardSelectedContainer movie={selectedMovie} isLoading={false} isError={false} />);

    const searchButton = getByRole('button');
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    expect(mockedPush).toBeCalledWith(
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
});
