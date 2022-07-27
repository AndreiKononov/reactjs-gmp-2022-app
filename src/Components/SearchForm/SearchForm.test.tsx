import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import SearchForm from './SearchForm';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

describe('SearchForm', () => {
  it('should match SearchForm snapshot', () => {
    useRouter.mockImplementationOnce(() => ({
      query: {},
      push() {},
    }));

    const { asFragment } = render(<SearchForm />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should navigate to a search result on form submit', async () => {
    const mockedPush = jest.fn();

    useRouter.mockImplementationOnce(() => ({
      query: { sortBy: 'release_date' },
      push: mockedPush,
    }));

    const { getByPlaceholderText, getByRole } = render(<SearchForm />);

    const searchInput = getByPlaceholderText('What do you want to watch?');
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'Moon');
    const searchButton = getByRole('button');
    expect(searchButton).toBeInTheDocument();
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(mockedPush).toBeCalledWith(
        {
          pathname: `/search/[search]`,
          query: {
            sortBy: 'release_date',
            search: 'moon',
          },
        },
        undefined,
        { shallow: true }
      );
    });
  });
});
