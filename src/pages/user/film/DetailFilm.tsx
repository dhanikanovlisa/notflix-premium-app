import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Film } from "../../../types/interfaces";
import Navbar from "../../../components/navbar/Navbar";
import Modal from "../../../components/modal/Modal";
import Toast from "../../../components/toast/Toast";
import Loading from "../../../components/loading/Loading";
import { deleteAPI, getAPI } from "../../../utils/api";
import { useAuth } from "../../../hooks/useAuth";

function DetailFilm() {
  const { id } = useParams();
  const [film, setFilm] = useState<Film | undefined>();
  const [filmGenre, setFilmGenre] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toastTrueUseState = useState(false);
  const toastErrorUseState = useState(false);
  const [showToastTrue, setShowToastTrue] = toastTrueUseState;
  const [showToastError, setShowToastError] = toastErrorUseState;
  const [loading, setLoading] = useState(false);
  const [user_id, setUserId] = useState(0);
  const {isAuth, isAdmin} = useAuth();
  const [user, isUser] = useState(false);

  useEffect(() => {
    document.title = "Detail Film";
    if (!isAuth() || isAdmin()) {
      window.location.href = "/404";
    }
    setUserId(Number(localStorage.getItem("id")));
    isUser(true);
  }, []);

  async function getFilmById() {
    const response = await getAPI(`films/film/${Number(id)}/user/${user_id}`);
    if (!response.ok) {
      if (response.status === 404) {
        setFilm(undefined);
        window.location.href = "/404";
        return;
      } if(response.status === 401){
        setFilm(undefined);
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
      const response = await deleteAPI(`films/film/delete/${Number(id)}`);
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
    getFilmById();
  });

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
            showUseState={toastTrueUseState}
          />
          <Toast
            type="cross"
            message="Failed deleted film"
            showUseState={toastErrorUseState}
          />
          <Navbar />
          <div className="pt-28 pl-5 sm:pl-10 pr-5 sm:pr-10 lg:pr-28">
            {loading && <Loading />}
            <h2 className="">{film.title}</h2>
            <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row gap-10 pt-5">
              <div className="sm:w-full md:w-full lg:w-48 xl:w-48">
                <div className="w-48 h-60 red-glow rounded-md overflow-hidden justify-center lg:justify-start">
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
              message="Are you sure you want to delete?"
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
