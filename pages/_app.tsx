import Head from 'next/head';
import '../src/index.scss';
import '../src/App.scss';
import '../src/components/Logo/Logo.scss';
import '../src/components/Footer/Footer.scss';
import '../src/components/AddMovieBtn/AddMovieBtn.scss';
import '../src/components/DeleteMovieConfirm/DeleteMovieConfirm.scss';
import '../src/components/EditMovieFormik/EditMovie.scss';
import '../src/components/Header/Header.scss';
import '../src/components/Hero/Hero.scss';
import '../src/components/Modal/Modal.scss';
import '../src/components/MovieCardSelectedContainer/MovieCardSelectedContainer.scss';
import '../src/components/MovieCardSelected/MovieCardSelected.scss';
import '../src/components/SearchForm/SearchForm.scss';
import '../src/components/Dropdown/Dropdown.scss';
import '../src/components/ErrorBoundary/ErrorBoundary.scss';
import '../src/components/FilterPanel/FilterPanel.scss';
import '../src/components/GenreToggleButton/GenreToggleButton.scss';
import '../src/components/Main/Main.scss';
import '../src/components/MovieListCard/MovieListCard.scss';
import '../src/components/MoviesFound/MoviesFound.scss';
import '../src/components/MoviesList/MoviesList.scss';
import '../src/components/SortPanel/SortPanel.scss';
import '../src/components/PageNotFound/PageNotFound.scss';
import '../src/containers/MoviesListOptionsContainer/MoviesListOptionsContainer.scss';
import { wrapper } from '../src/store';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Movie App</title>
      </Head>
      <div id="modal-container"></div>
      <div className="App">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default wrapper.withRedux(MyApp);
