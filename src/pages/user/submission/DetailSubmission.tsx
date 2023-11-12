import { useEffect, useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Toast from "../../../components/toast/Toast";
import Modal from "../../../components/modal/Modal";
import { useParams } from "react-router-dom";
import { FilmRequest } from "../../../interfaces/interfaces";
import StatusComponent from "../../../components/status/StatusComponent";

function DetailSubmission() {
  const url = import.meta.env.VITE_REST_URL;
  const { id } = useParams();
  const [requestFilm, setRequestFilm] = useState<FilmRequest | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToastTrue, setShowToastTrue] = useState(false);
  const [showToastError, setShowToastError] = useState(false);
  const [user_id, setId] = useState<number>(0);

  async function getFilmRequest() {
    const response = await fetch(`${url}/films/requestFilm/detail/${Number(id)}`);
    if (!response.ok) {
      if (response.status === 404) {
        setRequestFilm(undefined);
        window.location.href = "/not-found";
        return;
      }
    }
    const data = await response.json();
    const mappedData = {
      requestFilm_id: Number(data.data.requestFilm_id),
      filmName: data.data.filmName,
      description: data.data.description,
      film_path: data.data.film_path,
      film_poster: data.data.film_poster,
      film_header: data.data.film_header,
      date_release: new Date(data.data.date_release),
      duration: data.data.duration,
      id_user: data.data.id_user,
      status: { status: data.data.status },
    };
    setRequestFilm(mappedData);
  }

  async function deleteFilmRequest() {
    try {
      const response = await fetch(`${url}/requestFilm/delete/${Number(id)}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete film. Status: ${response.status}`);
      }

      setIsModalOpen(false);
      setShowToastTrue(true);
      setTimeout(() => {
        window.location.href = `{/submission/${user_id}}`;
      }, 2000);
    } catch (error) {
      setIsModalOpen(false);
      setShowToastError(true);
    }
  }

  useEffect(() => {
    getFilmRequest();
    if (localStorage.getItem("admin") !== "false") {
      window.location.href = "/404";
    }
    setId(Number(localStorage.getItem("id")));
  }, [id]);

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    deleteFilmRequest();
  };
  return (
    <>
      {requestFilm && (
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
            <div className="items-center gap-2 flex flex-row">
              <h2 className="">{requestFilm.filmName}</h2>
              <StatusComponent status={requestFilm.status.status} />
            </div>
            <div className="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row gap-10 pt-5">
              <div className="sm:w-full md:w-full lg:w-48 xl:w-48">
                <div className="w-48 h-60 red-glow rounded-md overflow-hidden sm:justify-center">
                  <img
                    src={`/src/assets/storage/poster/${requestFilm.film_poster}`}
                    alt="Placeholder"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full sm:w-full md:w-full lg:w-5/12 xl:w- space-y-2 pb-2">
                <div className="">
                  <div>
                    <h3>Description</h3>
                    <p>{requestFilm.description}</p>
                  </div>
                  <div>
                    <h3>Release Year</h3>
                    <p>
                      {requestFilm.date_release.getDate()}-
                      {requestFilm.date_release.getMonth() + 1}-
                      {requestFilm.date_release.getFullYear()}
                    </p>
                  </div>
                  <div>
                    <h3>Duration</h3>
                    <p>{requestFilm.duration} minutes</p>
                  </div>
                </div>
                {requestFilm.status.status === "PENDING" ? (
                  <div className="flex flex-row justify-between">
                    <button
                      className="button-red font-bold text-button"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Delete
                    </button>
                    <button className="button-white font-bold text-button">
                      Edit
                    </button>
                  </div>
                )  : null}
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

export default DetailSubmission;
