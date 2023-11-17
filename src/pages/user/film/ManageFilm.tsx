import { useEffect, useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import CardFilm from "../../../components/card/CardFilm";
import { Film } from "../../../types/interfaces";
import { useParams } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import { getAPI } from "../../../utils/api";
import { useAuth } from "../../../hooks/useAuth";
import Pagination from "../../../components/pagination/Pagination";

function ManageFilm() {
  const { id,page } = useParams();
  const [filmData, setFilmData] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(true);
  const { isAuth, isAdmin } = useAuth();
  const [empty, setEmpty] = useState(false);
  const [lengthFilm, setLengthFilm] = useState(0);
  const [currentPage, setCurrentPage] = useState(page ? parseInt(page) : 1);

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

  const fetchLength = async () => {
    try {
      const response = await getAPI(`films/count`);
      const data = await response.json();
      setLengthFilm(data.film_count);
    } catch (error) {
      console.error("Error fetching film", error);
    }
  };

  const fetchFilm = async () => {
    try {
      console.log(currentPage)
      const response = await getAPI(`films/user/${id}?page=${currentPage}&limit=10`);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      if (Array.isArray(data.data)) {
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
      } else if (typeof data.data === 'object') {
        const mappedData: Film = data.data;
        setFilmData([mappedData]);
      } else {
        console.error("Data is not an array or object:", data.data);
      }
    } catch (error) {
      console.error("Error fetching film", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLength();
  }, [id, page]);

  useEffect(() => {
    fetchFilm();
    const intervalId = setInterval(() => {
      console.log("fetching");
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [id, page, currentPage]);

  useEffect(() => {
    setEmpty(filmData.length === 0);
  }, [filmData]);

  function cardFilm() {
    return empty ? (
      <p>Empty film</p>
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
            <Pagination
              totalRecords={lengthFilm}
              itemsPerPage={10}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      )}
    </>
  );
}

export default ManageFilm;
