import { GenreToggleButton } from '../GenreToggleButton/GenreToggleButton';
import { Genre } from '../../models/Genre';
// import './FilterPanel.scss';

interface GenreToggleProps {
  genres: Genre[];
  selectedGenre: string | null;
  handleSelect: (value: Genre) => void;
}

export function GenreTogglePanel({genres, selectedGenre, handleSelect}: GenreToggleProps) {
  const isGenreSelected = (genre: Genre): boolean => {
    if (!selectedGenre) {
      return genre.value === ''; // to select 'All' filter
    }

    return genre.value === selectedGenre;
  };

  return (
    <div className="genre-panel">
      {genres.map((genre: Genre) => {
        return (
          <GenreToggleButton
            key={genre.value}
            isSelected={isGenreSelected(genre)}
            genreTitle={genre.label}
            handleSelect={() => handleSelect(genre)}
          />
        );
      })}
    </div>
  );
}
