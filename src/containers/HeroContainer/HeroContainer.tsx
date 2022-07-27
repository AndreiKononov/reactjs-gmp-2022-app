import { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { AddMovieBtn } from '../../components/AddMovieBtn/AddMovieBtn';
import EditMovieFormik from '../../components/EditMovieFormik/EditMovieFormik';
import { Header } from '../../components/Header/Header';
import { Hero } from '../../components/Hero/Hero';
import { Logo } from '../../components/Logo/Logo';
import MovieCardSelectedContainer from '../../components/MovieCardSelectedContainer/MovieCardSelectedContainer';
import SearchForm from '../../components/SearchForm/SearchForm';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useSelectedMovie } from '../../hooks/useSelectedMovie';
import { useEffectAfterFirstMount } from '../../hooks/useEffectAfterFirstMount';
import { fetchMovieById, resetSelectedMovie } from '../../store/selectedMovieReducer';

export default function HeroContainer() {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { movie: selectedMovieId } = router.query;

  const { movie: selectedMovie, isLoading: isSelectedMovieLoading, isError: isSelectedMovieError } = useSelectedMovie();

  useEffectAfterFirstMount(() => {
    if (selectedMovieId) {
      dispatch(fetchMovieById(selectedMovieId as string));
    } else {
      dispatch(resetSelectedMovie());
    }
  }, [selectedMovieId, dispatch]);

  const [shouldShowAddMovieModal, setShouldShowAddMovieModal] = useState(false);

  const closeModal = () => setShouldShowAddMovieModal(false);

  const Modal = dynamic(() => import('../../components/Modal/Modal'), { ssr: false });

  const modal = shouldShowAddMovieModal ? (
    <Modal title="Add Movie" handleClose={closeModal}>
      <EditMovieFormik movie={null} handleClose={closeModal} />
    </Modal>
  ) : null;

  const shouldDisplaySelectedMovieCard = selectedMovie || isSelectedMovieLoading || isSelectedMovieError;

  const heroElement = !shouldDisplaySelectedMovieCard ? (
    <Hero>
      <Header>
        <Logo />
        <AddMovieBtn handleClick={() => setShouldShowAddMovieModal(true)} />
      </Header>
      <SearchForm />
      {modal}
    </Hero>
  ) : (
    <MovieCardSelectedContainer movie={selectedMovie} isLoading={isSelectedMovieLoading} isError={isSelectedMovieError} />
  );

  return heroElement;
}
