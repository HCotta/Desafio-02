import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface Genero {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProviderProps {
  children: ReactNode;
}

interface MoviesContextDate {
  movies: Movie[];
  idGeneroSelecionado: number;
  generos: Genero[];
  generoSelecionado: Genero;
  setIdGeneroSelecionado: (id: number) => void;
}

export const MoviesContext = createContext<MoviesContextDate>(
  {} as MoviesContextDate
);

export function MoviesProvider({ children }: MovieProviderProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [idGeneroSelecionado, setIdGeneroSelecionado] = useState(1);
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [generoSelecionado, setGeneroSelecionado] = useState<Genero>({} as Genero);

  useEffect(() => {
    api.get<Genero[]>('genres').then(response => {
      setGeneros(response.data);
    });
  }, []);

  useEffect(() => {

    api.get<Movie[]>(`movies/?Genre_id=${idGeneroSelecionado}`).then(response => {
      setMovies(response.data);
    });

    api.get<Genero>(`genres/${idGeneroSelecionado}`).then(response => {
      setGeneroSelecionado(response.data);
    })
  }, [idGeneroSelecionado]);


  return (
    <MoviesContext.Provider value={{ movies, generos, idGeneroSelecionado, generoSelecionado, setIdGeneroSelecionado }}>
      {children}
    </MoviesContext.Provider>
  )
}

export function useMovies() {
  const context = useContext(MoviesContext);
  return context;
}