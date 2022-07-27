import { useRouter } from 'next/router';
import { GenreTogglePanel as FilterPanel } from '../../components/FilterPanel/FilterPanel';
import { MoviesFound } from '../../components/MoviesFound/MoviesFound';
import { SortPanel } from '../../components/SortPanel/SortPanel';
import { genres } from './genres';
import { sortOptions } from './sortOptions';
import { SelectValue } from '../../models/SelectValue';
import { Genre } from '../../models/Genre';
import { useMovies } from '../../hooks/useMovies';
// import './MoviesListOptionsContainer.scss';

export function MoviesListOptionsContainer() {
  const { movies } = useMovies();
  const router = useRouter();

  const handleQueryParamChange = (selectedItem: SelectValue | Genre, paramName: 'genre' | 'sortBy'): void => {
    const selectedValue: string = selectedItem.value;

    if (selectedValue) {
      router.query[paramName] = selectedValue;
    } else {
      delete router.query[paramName];
    }

    router.push(
      {
        pathname: router.pathname,
        query: router.query,
      },
      undefined,
      { shallow: true }
    );
  };

  const getSortByValue = (value: string | null): SelectValue | null => {
    if (!value) {
      return null;
    }

    return sortOptions.find((option) => option.value === value)!;
  };

  return (
    <>
      <div className="options-panel">
        <FilterPanel
          genres={genres}
          selectedGenre={router.query.genre as string}
          handleSelect={(selectedItem) => handleQueryParamChange(selectedItem, 'genre')}
        />
        <SortPanel
          sortOptions={sortOptions}
          sortByValue={getSortByValue(router.query.sortBy as string)}
          handleSelect={(selectedItem) => handleQueryParamChange(selectedItem, 'sortBy')}
        />
      </div>
      <MoviesFound numberOfMovies={movies.length} />
    </>
  );
}
