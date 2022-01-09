import { useMovies } from '../hooks/useMovies';
import { Button } from './Button';
import './../styles/sidebar.scss';

export function SideBar() {
  const { generos, idGeneroSelecionado, setIdGeneroSelecionado } = useMovies();

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {generos.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => setIdGeneroSelecionado(genre.id)}
            selected={idGeneroSelecionado === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}