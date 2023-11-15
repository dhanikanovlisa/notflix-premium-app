import { useParams } from "react-router-dom";
import Navbar from "../../../components/navbar/Navbar";
import Toast from "../../../components/toast/Toast";
import Modal from "../../../components/modal/Modal";
import Field from "../../../components/field/Field";
import TextArea from "../../../components/textarea/TextArea";
import UploadFile from "../../../components/uploadFIle/UploadFile";
import Dropdown from "../../../components/dropdown/Dropdown";
import Loading from "../../../components/loading/Loading";
import { useState, useEffect } from "react";
import { FilmRequest } from "../../../types/interfaces";
import { getAPI, putAPI } from "../../../utils/api";
import { useAuth } from "../../../hooks/useAuth";

function EditSubmission() {
  const { id } = useParams();
  const [requestFilm, setRequestFilm] = useState<FilmRequest | undefined>();
  const [showToastTrue, setShowToastTrue] = useState(false);
  const [showToastError, setShowToastError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [film_path, setFilmPath] = useState<File>();
  const [film_poster, setPosterPath] = useState<File>();
  const [film_header, setHeaderPath] = useState<File>();
  const [date_release, setReleaseDate] = useState("");
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const duration = hour * 60 + minute;
  const [id_user, setUserID] = useState(0);

  const { isAuth, isAdmin } = useAuth();
  useEffect(() => {
    document.title = "Detail Film";
    if (!isAuth() || isAdmin()) {
      window.location.href = "/404";
    }
  }, [id]);

  const hoursArray: string[] = Array.from({ length: 24 }, (_, index) =>
    (index + 1).toString()
  );
  const minutesArray: string[] = Array.from({ length: 60 }, (_, index) =>
    (index + 1).toString()
  );

  hoursArray.unshift("");
  minutesArray.unshift("");
  useEffect(() => {
    document.title = "Edit Request Film";
    if (localStorage.getItem("admin") !== "false") {
      window.location.href = "/404";
    }
    setUserID(Number(localStorage.getItem("id")));
  });

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    window.location.href = "/submission/detail" + id;
  };

  async function getFilmRequest() {
    const response = await getAPI(`films/requestFilm/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        setRequestFilm(undefined);
        window.location.href = "/404";
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

  useEffect(() => {
    getFilmRequest();
  }, []);

  async function updateRequestFilm() {
    const filmName = film_path?.name;
    const posterName = film_poster?.name;
    const headerName = film_header?.name;
    const filmPathSize = film_path?.size;
    const posterPathSize = film_poster?.size;
    const headerPathSize = film_header?.size;
    const response = await putAPI(`films/requestFilm/edit/${id}`, {
      title,
      description,
      film_path: filmName,
      film_poster: posterName,
      film_header: headerName,
      film_path_size: filmPathSize,
      film_poster_size: posterPathSize,
      film_header_size: headerPathSize,
      date_release: date_release,
      duration: duration,
      user_id: id_user,
    });

    if (!response.ok) {
      if (response.status === 404) {
        setShowToastError(true);
        setMsg("Fail to update request film");
        return;
      } else if (response.status === 400) {
        setShowToastError(true);
        setMsg("Fail to update request film");
        return;
      }
    }
    setLoading(true);
    setShowToastTrue(true);
    setTimeout(() => {
      window.location.href = "/submission/film/" + id;
    }, 2000);
  }

  return (
    <>
      <Toast
        type="check"
        message="Sucesfully updated request film"
        showUseState={showToastTrue}
      />
      <Toast type="cross" message={msg} showUseState={showToastError} />
      <Navbar />
      {loading && <Loading />}
      <div className="pt-28 pl-5 sm:pl-10 pr-5 sm:pr-10 lg:pr-28">
        <h1 className="text-left">Edit Request Film</h1>
        <div className="flex sm:flex-col lg:flex-row">
          <div className="w-full">
            <div className="flex gap-5 sm:flex-col md:flex-col lg:flex-row xl:flex-row">
              <div className="w-1/3">
                <Field
                  type="text"
                  label="Film Name"
                  htmlFor="filmName"
                  required={false}
                  placeholder={requestFilm?.filmName}
                  errorMessage=""
                  value={title}
                  onChangeHandler={(event) => setTitle(event.target.value)}
                />
                <TextArea
                  label="Description"
                  rows={4}
                  required={false}
                  htmlFor="description"
                  placeholder={requestFilm?.description}
                  value={description}
                  onChangeHandler={(event) =>
                    setDescription(event.target.value)
                  }
                />
              </div>
            </div>
            <div className="pb-10">
              <Field
                type="date"
                label="Release Date"
                htmlFor="releaseDate"
                required={false}
                value={date_release}
                onChangeHandler={(event) => setReleaseDate(event.target.value)}
              />
              <div className="flex flex-row gap-10">
                <Dropdown
                  label="Hour"
                  htmlFor="hour"
                  required={false}
                  options={hoursArray}
                  onChangeHandler={(event) =>
                    setHour(Number(event.target.value))
                  }
                />
                <Dropdown
                  label="Minute"
                  htmlFor="minute"
                  required={false}
                  options={minutesArray}
                  onChangeHandler={(event) =>
                    setMinute(Number(event.target.value))
                  }
                />
              </div>
            </div>
            <div className="flex gap-10 pb-5 flex-col lg:flex-row">
              <UploadFile
                type="image/*"
                htmlFor="poster"
                description="Upload Film Poster (max 800KB)"
                file={film_poster}
                onChangeHandler={(event) =>
                  setPosterPath(event.target.files?.[0])
                }
              />
              <UploadFile
                type="image/*"
                htmlFor="header"
                description="Upload Film Header (max 800KB)"
                file={film_header}
                onChangeHandler={(event) =>
                  setHeaderPath(event.target.files?.[0])
                }
              />
              <UploadFile
                type="video/*"
                htmlFor="video"
                description="Upload Film Poster (max 9 MB)"
                file={film_path}
                onChangeHandler={(event) =>
                  setFilmPath(event.target.files?.[0])
                }
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between pb-5">
          <button
            className="button-red font-bold text-button"
            onClick={() => setIsModalOpen(true)}
          >
            Cancel
          </button>
          <button
            className="button-white font-bold text-button"
            onClick={updateRequestFilm}
          >
            Save
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title="Are you sure?"
          message="Are you sure you want to cancel?"
          onCancel={handleModalCancel}
          onConfirm={handleModalConfirm}
        />
      )}
    </>
  );
}

export default EditSubmission;
