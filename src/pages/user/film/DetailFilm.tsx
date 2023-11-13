import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Film } from "../../../interfaces/interfaces";
import Navbar from "../../../components/navbar/Navbar";
import Modal from "../../../components/modal/Modal";
import Toast from "../../../components/toast/Toast";
import Loading from "../../../components/loading/Loading";

function DetailFilm() {
  const url = import.meta.env.VITE_REST_URL;
  const { id } = useParams();
  const [film, setFilm] = useState<Film | undefined>();
  const [filmGenre, setFilmGenre] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToastTrue, setShowToastTrue] = useState(false);
  const [showToastError, setShowToastError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user_id, setUserId] = useState(0);

  async function getFilmById() {
    const response = await fetch(`${url}/films/film/${Number(id)}`);
    if (!response.ok) {
      if (response.status === 404) {
        setFilm(undefined);
        window.location.href = "/not-found";
        return;
      }
    }

    const data = await response.json();
    const mappedData = {
      film_id: data.data.film_id,
      title: data.data.title,
      description: data.data.description,
      film_path: data.data.film_path,
      film_poster: data.data.film_poster,
      film_header: data.data.film_header,
      date_release: new Date(data.data.date_release),
      duration: data.data.duration,
      id_user: data.data.id_user,
    };
    setFilm(mappedData);
    setFilmGenre(data.genre);
  }

  async function deleteFilm() {
    try {
      const response = await fetch(`${url}/films/film/delete/${Number(id)}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem('token') || '',
      },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete film. Status: ${response.status}`);
      }

      setIsModalOpen(false);
      setShowToastTrue(true);
      setLoading(true);
      setTimeout(() => {
        window.location.href = "/manage-film/" + user_id;
      }, 2000);
    } catch (error) {
      setIsModalOpen(false);
      setShowToastError(true);
      console.error("Error deleting film:", error);
    }
  }

  useEffect(() => {
    setUserId(Number(localStorage.getItem("id")));
    getFilmById();
    if(localStorage.getItem("admin") !== "false"){
      window.location.href = "/404"
  }
  }, [id]);

  function goToEdit() {
    window.location.href = `/manage-film/edit/${Number(id)}`;
  }

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    deleteFilm();
  };

  return (
    <>
      {film && (
        <>
          <Toast
            type="check"
            message="Sucesfully deleted film"
            showUseState={showToastTrue}
          />
          <Toast
            type="cross"
            message="Failed deleted film"
            showUseState={showToastError}
          />
          <Navbar />
          <div className="pt-28 pl-5 sm:pl-10 pr-5 sm:pr-10 lg:pr-28">
            {loading && <Loading />}
            <h2 className="">{film.title}</h2>
            <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row gap-10 pt-5">
              <div className="sm:w-full md:w-full lg:w-48 xl:w-48">
                <div className="w-48 h-60 red-glow rounded-md overflow-hidden sm:justify-center">
                  <img
                    src={`/src/assets/storage/poster/${film.film_poster}`}
                    alt="Placeholder"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full sm:w-full md:w-full lg:w-5/12 xl:w- space-y-2 pb-2">
                <div className="">
                  <div>
                    <h3>Description</h3>
                    <p>{film.description}</p>
                  </div>
                  <div>
                    <h3>Genre</h3>
                    <p>{[...filmGenre].join(", ")}</p>
                  </div>
                  <div>
                    <h3>Release Year</h3>
                    <p>
                      {film.date_release.getDate()}-
                      {film.date_release.getMonth() + 1}-
                      {film.date_release.getFullYear()}
                    </p>
                  </div>
                  <div>
                    <h3>Duration</h3>
                    <p>{film.duration} minutes</p>
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <button
                    className="button-red font-bold text-button"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Delete
                  </button>
                  <button
                    className="button-white font-bold text-button"
                    onClick={goToEdit}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
          {isModalOpen && (
            <Modal
              title="Are you sure?"
              message="Are you sure you want to cancel?"
              confirmText="Delete"
              onCancel={handleModalCancel}
              onConfirm={handleModalConfirm}
            />
          )}
        </>
      )}
    </>
  );
}

export default DetailFilm;
