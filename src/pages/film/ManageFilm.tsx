import { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import CardFilm from "../../components/card/CardFilm";
import { useState } from "react";
import { Film } from "../../interfaces/interfaces";

function ManageFilm() {
  const [filmData, setFilmData] = useState<Film[]>([]);

  useEffect(() => {
    document.title = "Manage Film";
  });

  const url = import.meta.env.VITE_REST_URL;

  const fetchFilm = async () => {
    try {
      const response = await fetch(`${url}/films/user/2`);
      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      const mappedData = data.data.map((film: Film) => ({
        film_id: film.film_id,
        title: film.title,
        description: film.description,
        film_path: film.film_path,
        film_poster: film.film_poster,
        film_header: film.film_header,
        date_release: new Date(film.date_release),
        duration: film.duration,
        id_user: film.id_user
      }));

      setFilmData(mappedData);
    } catch (error) {
      console.error('Error fetching film', error);
    }
  };

  useEffect(() => {
    fetchFilm();
  }, []);

  function cardFilm(){
    return filmData.map((film) => (
      <CardFilm
        key = {film.film_id}
        id= {film.film_id}
        title={film.title}
        image={`/src/assets/storage/poster/${film.film_poster}`}
      />
    ));
  }
  return (
    <>
      <Navbar />
      <div className="pt-28 pl-10 pr-28">
        <h2>Manage Film</h2>
        <div className="pt-5 flex flex-wrap gap-12 justify-center">{cardFilm()}</div>
      </div>
    </>
  );
}

export default ManageFilm;
