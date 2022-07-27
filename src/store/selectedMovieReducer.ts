import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../models/Movie';
import { MoviesApiService } from './moviesApiService';

export interface SelectedMovieState {
  movie: Movie | null;
  isLoading: boolean;
  isError: boolean;
}

export const selectedMovieInitialState: SelectedMovieState = {
  movie: null,
  isLoading: false,
  isError: false,
};
export const fetchMovieById = createAsyncThunk('toolkit/moviesReducer/fetchMovie', MoviesApiService.fetchMovieById);

const selectedMovieSlice = createSlice({
  name: 'tookit/moviesReducer',
  initialState: selectedMovieInitialState,
  reducers: {
    resetSelectedMovie: () => selectedMovieInitialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovieById.pending, (state: SelectedMovieState) => {
      state.movie = null;
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(fetchMovieById.fulfilled, (state: SelectedMovieState, action: PayloadAction<Movie>) => {
      state.movie = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchMovieById.rejected, (state: SelectedMovieState) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { resetSelectedMovie } = selectedMovieSlice.actions;
export default selectedMovieSlice.reducer;
