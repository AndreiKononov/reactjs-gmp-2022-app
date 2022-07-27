// import './MoviesFound.scss';

interface MoviesFoundProps {
  numberOfMovies: number;
}

export function MoviesFound({ numberOfMovies }: MoviesFoundProps) {
  return (
    <div className="movies-found">
      <span className="movies-found-value">{numberOfMovies}</span> movies found
    </div>
  );
}
