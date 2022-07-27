import React from 'react';
import { transformDuration } from '../../utils/transformDuration';
import { Movie } from '../../models/Movie';
import { getYear } from '../../utils/getYearFromDate';
import { joinGenres } from '../../utils/joinGenresWithComma';
import { NextImageCustom } from '../NextImageCustom/NextImageCustom';
// import './MovieCardSelected.scss';

interface MovieCardSelectedProps {
  movie: Movie;
}

function MovieCardSelectedComponent({ movie }: MovieCardSelectedProps) {
  const { title, poster_path, vote_average, genres, release_date, runtime, overview } = movie;

  return (
    <div className="movie-card-selected">
      <div className="image-container">
        <NextImageCustom className="movie-card-selected-image" alt={`${title} poster`} src={poster_path} width={320} height={480} />
      </div>
      <div className="movie-card-selected-content">
        <div className="movie-card-selected-content-header">
          <span className="movie-card-selected-title">{title}</span>
          <span className="movie-card-selected-rating">{vote_average}</span>
        </div>
        <div className="movie-card-selected-genres">
          <span>{joinGenres(genres)}</span>
        </div>
        <div className="movie-card-selected-info">
          <span>{getYear(release_date)}</span>
          <span>{transformDuration(runtime)}</span>
        </div>
        <div className="movie-card-selected-overview">{overview}</div>
      </div>
    </div>
  );
}

export const MovieCardSelected = React.memo(MovieCardSelectedComponent);
