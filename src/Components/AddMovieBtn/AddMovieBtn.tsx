// import './AddMovieBtn.scss';

interface AddMovieBtnProps {
  handleClick: () => void;
}

export function AddMovieBtn({handleClick}: AddMovieBtnProps) {
  return (
    <button className="add-movie-btn" onClick={handleClick}>
      + Add Movie
    </button>
  );
}
