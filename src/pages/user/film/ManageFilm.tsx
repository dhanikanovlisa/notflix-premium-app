import { useEffect } from "react";
import Navbar from "../../../components/navbar/Navbar";
import CardFilm from "../../../components/card/CardFilm";
import { useState } from "react";
import { Film } from "../../../types/interfaces";
import { useParams } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import { getAPI } from "../../../utils/api";
import { useAuth } from "../../../hooks/useAuth";

function ManageFilm() {
  const { id } = useParams();
  const [filmData, setFilmData] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(true);
  const { isAuth, isAdmin } = useAuth();
  const [empty, isEmpty] = useState(false);

  useEffect(() => {
    document.title = "Manage Film";
    if (!isAuth() || isAdmin()) {
      window.location.href = "/404";
    }
    if (id !== localStorage.getItem("id")) {
      setValid(false);
      window.location.href = "/404";
    }
  }, [id]);

  const fetchFilm = async () => {
    try {
      const response = await getAPI(`films/user/${id}`);
      if (!response.ok) {
        throw new Error("Something went wrong");
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
        id_user: film.id_user,
      }));

      setFilmData(mappedData);
    } catch (error) {
      console.error("Error fetching film", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilm();
    if (filmData.length === 0) {
      isEmpty(true);
    }
  }, []);

  function cardFilm() {
    return empty ? (
      <>
        <p>Empty film</p>
      </>
    ) : (
      filmData.map((film) => (
        <CardFilm
          key={film.film_id}
          id={film.film_id}
          title={film.title}
          image={`/src/assets/storage/poster/${film.film_poster}`}
        />
      ))
    );
  }
  return (
    <>
      {valid && (
        <>
          <Navbar />
          <div className="pt-28 pl-10 pr-28">
            {loading && <Loading />}
            <h2>Manage Film</h2>
            <div className="pt-5 flex flex-wrap gap-12 justify-center">
              {cardFilm()}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ManageFilm;
