import { useEffect, useState } from "react";
import { Character } from "./Character.jsx";

function NavPage(props) {
  // como el setPage pertenece a otro componente, lo traemos con props para que asi pueda cambiar
  return (
    <header className="d-flex justify-content-between  align-items-center">
      <p>Page: {props.page}</p>
      <button
        className="btn btn-primary btn-sm"
        onClick={() => props.setPage(props.page + 1)}
      >
        Page {props.page + 1}
      </button>
    </header>
  );
}
//Cada que se escucha el evento click props.setPage modifica su valor el cual viene de props.page y se le incrementa 1, este setPage a su vez modifica a page

function CharacterList() {
  const [characters, setCharacters] = useState([]); // al useState se le puede dar o no un valor inicial el cual luego puede ser modificado, en este caso no se le da
  const [loading, setLoading] = useState([true]); // Aqui se le da true  y cuando se ejecute pasara a false nuevamente
  const [page, setPage] = useState(1); //El setPage es el que va modificando a page, inicialmente le pasamos el 1 por medio de useState para que muestre algo inicialmente, en este caso la pagina 1, pero a medida que utilizemos el componente Navpage este va a llevar los valores que actualmente estan declarados, luego esta funcion los modifica incrementadolos y los retorna en donde fue llamada, como estos valores cambian y el page cambia y la function useEfect lo escucha entonces ya muestra el nuevo valor... page 1, page2, page3...

  useEffect(() => {
    //recibe una function que es lo que mostrara, y recibe un parametro el cual si en algun momento cambia, la funcion inicial se vuelve a ejecutar
    async function fetchData() {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      const data = await response.json();
      setLoading(false);
      setCharacters(data.results);
    }
    fetchData();
  }, [page]); // useEffect esta escuchando siempre para ver si page cambia y volverse a ejecutar

  return (
    <div className="container">
      <NavPage page={page} setPage={setPage} />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          {characters.map((character) => {
            return (
              <div className="col-md-4" key={character.id}>
                <Character
                  key={character.id}
                  name={character.name}
                  origin={character.origin}
                  image={character.image}
                />
              </div>
            );
          })}
        </div>
      )}
      <NavPage page={page} setPage={setPage} />
    </div>
  );
}

export default CharacterList;
