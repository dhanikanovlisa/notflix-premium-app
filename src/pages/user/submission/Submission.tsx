import { useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import CardSubmission from "../../../components/card/CardSubmission";
import { useState, useEffect } from "react";
import { FilmRequest } from "../../../interfaces/interfaces";

function Submission() {
  const { id } = useParams();
  const url = import.meta.env.VITE_REST_URL;
  const [filmRequest, setFilmRequest] = useState<FilmRequest[]>([]);

  const fetchRequestFilm = async () => {
    try {
      const response = await fetch(`${url}/films/requestFilm/${id}`);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      const mappedData = data.data.map((filmRequest: FilmRequest) => ({
        requestFilm_id: filmRequest.requestFilm_id,
        filmName: filmRequest.filmName,
        description: filmRequest.description,
        film_path: filmRequest.film_path,
        film_poster: filmRequest.film_poster,
        film_header: filmRequest.film_header,
        date_release: new Date(filmRequest.date_release),
        duration: filmRequest.duration,
        id_user: filmRequest.id_user,
        status: { status: filmRequest.status },
      }));

      setFilmRequest(mappedData);
    } catch (error) {
      console.error("Error fetching request film", error);
    }
  };
  useEffect(() => {
    fetchRequestFilm();
    
  }, []);

  function cardRequestFilm() {
    return filmRequest.map((filmRequest) => (
      <CardSubmission
        key={filmRequest.requestFilm_id}
        id={filmRequest.requestFilm_id}
        image={`/src/assets/storage/poster/${filmRequest.film_poster}`}
        title={filmRequest.filmName}
        description={filmRequest.description}
        status={filmRequest.status}
      />
    ));
  }

  return (
    <>
      <Navbar />
      <div className="pt-32 pl-10 pr-20">
        <div className="flex flex-row justify-between">
          <h3>Request List</h3>
          <button
            className="button-white text-button font-bold"
            onClick={() => (window.location.href = "/submission/create")}
          >
            Create
          </button>
        </div>
        <div className="pt-5 flex flex-wrap gap-12 pb-5">{cardRequestFilm()}</div>
      </div>
    </>
  );
}

export default Submission;
