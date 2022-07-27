import { useId } from 'react';
import { Formik, Form, FormikProps, FormikHelpers } from 'formik';
import { genres } from '../../containers/MoviesListOptionsContainer/genres';
import { EditMovieFormValue } from '../../models/EditMovieFormValue';
import { Genre } from '../../models/Genre';
import { Movie } from '../../models/Movie';
import { TextField } from '../TextField/TextField';
import { FormSelect } from '../FormSelect/FormSelect';
import { validationSchema } from './validationSchema';
import { createMovie, editMovie, fetchMovies } from '../../store/moviesReducer';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useQueryParams } from '../../hooks/useQueryParams';
import { getMovieFromFormValue } from '../../utils/getMovieFromFormValue';
import { AsyncSubmitStatus } from '../../models/AsyncSubmitStatus';
// import './EditMovie.scss';

interface EditMovieProps {
  movie: Movie | null;
  handleClose: () => void;
}

function setInitialFormValue(movie: Movie | null): EditMovieFormValue {
  return {
    title: movie?.title || '',
    release_date: movie?.release_date || '',
    poster_path: movie?.poster_path || '',
    vote_average: movie?.vote_average?.toString() || '',
    runtime: movie?.runtime?.toString() || '',
    overview: movie?.overview || '',
    genres: movie?.genres.map((value: string): Genre => ({ value, label: value })) || [],
  };
}

const EditMovieFormik = ({ movie, handleClose }: EditMovieProps) => {
  const dispatch = useAppDispatch();
  const routerQueryParams = useQueryParams();

  const inputIdPrefix = useId();
  const getIdFor = (fieldName: string): string => `${inputIdPrefix}_${fieldName}`;

  const handleFormSubmit = async (formValue: EditMovieFormValue, { setSubmitting, setStatus }: FormikHelpers<EditMovieFormValue>) => {
    const isEditing = !!movie?.id;

    const formMovie: Partial<Movie> = getMovieFromFormValue(formValue);
    const actionToDispatch = isEditing ? editMovie({ ...formMovie, id: movie.id }) : createMovie(formMovie);

    try {
      await dispatch(actionToDispatch)
      dispatch(fetchMovies(routerQueryParams));
      handleClose();
      setStatus(AsyncSubmitStatus.SUBMIT_SUCCESS);
    } catch (rejectedValueOrSerializedError) {
      setStatus(AsyncSubmitStatus.SUBMIT_FAIL);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={setInitialFormValue(movie)} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
      {({ isSubmitting, status }: FormikProps<EditMovieFormValue>) => (
        <Form className="edit-movie-form">
          {status === AsyncSubmitStatus.SUBMIT_FAIL && <p className="form-error">Submit failed. Please try again.</p>}

          <div className="form-fields">
            <TextField name="title" id={getIdFor('title')} label="Title:" type="text" placeholder="Title" />
            <TextField name="release_date" id={getIdFor('release_date')} label="Release date:" type="date" placeholder="Select Date" />
            <TextField name="poster_path" id={getIdFor('poster_path')} label="Poster Url:" type="url" placeholder="https://" />
            <TextField name="vote_average" id={getIdFor('vote_average')} label="Rating:" type="text" placeholder="7.8" />
            <FormSelect name="genres" inputId={getIdFor('genres')} label="Genre:" isMulti options={genres} />
            <TextField name="runtime" id={getIdFor('runtime')} label="Runtime:" type="text" placeholder="minutes" />
            <TextField name="overview" id={getIdFor('overview')} label="Overview:" textarea type="text" placeholder="Movie description" />
          </div>

          <div className="edit-movie-form-actions">
            <button className="app-btn app-btn-reverse" type="reset">Reset</button>
            <button className="app-btn" disabled={isSubmitting} type="submit">Submit</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditMovieFormik;
