import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Logo } from '../Logo/Logo';
import { Movie } from '../../models/Movie';
import { MovieCardSelected } from '../MovieCardSelected/MovieCardSelected';
// import './MovieCardSelectedContainer.scss';

interface MovieCardSelectedContainerProps {
  movie: Movie | null;
  isLoading: boolean;
  isError: boolean;
}

function MovieCardSelectedContainerComponent({ movie, isLoading, isError }: MovieCardSelectedContainerProps) {
  const router = useRouter();

  const handleGoToSearch = useCallback(() => {
    delete router.query.movie;
    router.push(
      {
        pathname: router.pathname,
        query: router.query,
      },
      undefined,
      { shallow: true }
    );
  }, [router]);

  return (
    <div className="movie-card-selected-container">
      <div className="movie-card-selected-container-header">
        <Logo />
        <button onClick={handleGoToSearch} className="movie-card-selected-search-btn">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      {isLoading && <h2>Loading...</h2>}
      {isError && <h1>Fetching Error!</h1>}
      {!isLoading && !isError && movie && <MovieCardSelected movie={movie} />}
    </div>
  );
}

export default React.memo(MovieCardSelectedContainerComponent);
