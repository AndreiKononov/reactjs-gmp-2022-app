import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '../models/Movie';
import { MoviesApiService } from './moviesApiService';

export interface FetchedMoviesState {
  movies: Movie[];
  isLoading: boolean;
  isError: boolean;
}

export const moviesInitialState: FetchedMoviesState = {
  movies: [],
  isLoading: false,
  isError: false,
};

export const fetchMovies = createAsyncThunk('toolkit/moviesReducer/fetchMovies', MoviesApiService.fetchMovies);
export const deleteMovieById = createAsyncThunk('toolkit/moviesReducer/deleteMovie', MoviesApiService.deleteMovieById);
export const createMovie = createAsyncThunk('toolkit/moviesReducer/createMovie', MoviesApiService.createMovie);
export const editMovie = createAsyncThunk('toolkit/moviesReducer/editMovie', MoviesApiService.editMovie);

const moviesSlice = createSlice({
  name: 'tookit/moviesReducer',
  initialState: moviesInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state: FetchedMoviesState) => {
      state.movies = [];
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state: FetchedMoviesState, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchMovies.rejected, (state: FetchedMoviesState) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default moviesSlice.reducer;
