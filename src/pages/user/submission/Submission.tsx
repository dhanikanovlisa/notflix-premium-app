import { useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import CardSubmission from "../../../components/card/CardSubmission";
import { useState, useEffect } from "react";
import { FilmRequest } from "../../../types/interfaces";
import Loading from "../../../components/loading/Loading";
import { getAPI } from "../../../utils/api";
import { useAuth } from "../../../hooks/useAuth";

function Submission() {
  const { id } = useParams();
  const [filmRequest, setFilmRequest] = useState<FilmRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(true);
  const { isAuth, isAdmin } = useAuth();
  const [empty, isEmpty] = useState(false);
  useEffect(() => {
    document.title = "Manage Film";
    if (!isAuth()) {
      window.location.href = "/404";
    }

    if (isAdmin()) {
      window.location.href = "/404";
    }
    if (id !== localStorage.getItem("id")) {
      setValid(false);
      window.location.href = "/404";
    }
  }, [id]);

  const fetchRequestFilm = async () => {
    try {
      const response = await getAPI(`films/requestFilm/${id}`);
      if (response.ok && response.status === 200) {
        const data = await response.json();
        if (Array.isArray(data.data)) {
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
        } else if (typeof data.data === 'object') {
          const mappedData: FilmRequest = data.data;
          setFilmRequest([mappedData]);
        } else {
          console.error("Data is not an array or object:", data.data);
        }
      }
    } catch (error) {
      console.error("Error fetching request film", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRequestFilm();
    if(filmRequest.length === 0){
      isEmpty(true);
    } else{
      isEmpty(false);
    }
  }, []);
  
  function cardRequestFilm() {
    return empty ? (
      <>
        <p>Empty submission</p>
      </>
    ) : (
      filmRequest.map((filmRequest) => (
        <CardSubmission
          key={filmRequest.requestFilm_id}
          id={filmRequest.requestFilm_id}
          image={`/src/assets/storage/poster/${filmRequest.film_poster}`}
          title={filmRequest.filmName}
          description={filmRequest.description}
          status={filmRequest.status}
        />
      ))
    );
  }
  
  

  return (
    <>
      {valid && (
        <>
          <Navbar />
          {loading && <Loading />}
          <div className="pt-32 pl-10 pr-20">
            <div className="flex flex-row space-x-4 justify-between">
              <h3>Request List</h3>
              <button
                className="button-white text-button font-bold h-full"
                onClick={() => (window.location.href = "/submission/create")}
              >
                Create
              </button>
            </div>
            <div className="pt-5 flex flex-wrap gap-12 pb-5 justify-center">
              {cardRequestFilm()}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Submission;
