import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Film, Genre } from "../../../interfaces/interfaces";
import Navbar from "../../../components/navbar/Navbar";
import Field from "../../../components/field/Field";
import Dropdown from "../../../components/dropdown/Dropdown";
import UploadFile from "../../../components/uploadFIle/UploadFile";
import CheckBox from "../../../components/checkbox/Checkbox";
import TextArea from "../../../components/textarea/TextArea";
import Toast from "../../../components/toast/Toast";
import Modal from "../../../components/modal/Modal";
import Loading from "../../../components/loading/Loading";

function EditFilm() {
  const url = import.meta.env.VITE_REST_URL;
  const { id } = useParams();
  const [genre, setGenre] = useState<Genre[]>([]);
  const [film, setFilm] = useState<Film | undefined>();
  const [showToastTrue, setShowToastTrue] = useState(false);
  const [showToastError, setShowToastError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [id_user, setUserID] = useState(0);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [film_path, setFilmPath] = useState<File>();
  const [film_poster, setPosterPath] = useState<File>();
  const [film_header, setHeaderPath] = useState<File>();
  const [date_release, setReleaseDate] = useState("");
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [genres, setGenres] = useState<number[]>([]);
  const duration = hour * 60 + minute;

  const hoursArray: string[] = Array.from({ length: 24 }, (_, index) =>
    (index + 1).toString()
  );
  const minutesArray: string[] = Array.from({ length: 60 }, (_, index) =>
    (index + 1).toString()
  );

  hoursArray.unshift("");
  minutesArray.unshift("");

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    window.location.href = "/manage-film/" + id;
  };

  useEffect(() => {
    document.title = "Edit Film";
    if (localStorage.getItem("admin") !== "false") {
      window.location.href = "/404";
    }
    setUserID(Number(localStorage.getItem("id")));
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${url}/films/film/${id}`);
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
        return;
      }
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
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${url}/genres`);
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
        return;
      }

      const mappedGenre = data.data;
      setGenre(mappedGenre);
    };
    fetchData();
  }, []);

  async function updateFilm() {
    const filmName = film_path?.name;
    const posterName = film_poster?.name;
    const headerName = film_header?.name;
    const filmPathSize = film_path?.size;
    const posterPathSize = film_poster?.size;
    const headerPathSize = film_header?.size;
    const response = await fetch(`${url}/films/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") || "",
      },
      body: JSON.stringify({
        title,
        description,
        film_path: filmName,
        film_poster: posterName,
        film_header: headerName,
        film_path_size: filmPathSize,
        film_poster_size: posterPathSize,
        film_header_size: headerPathSize,
        date_release,
        duration,
        id_user: id_user,
        genres,
      }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        setShowToastError(true);
        setMsg("Fail to update film");
        return;
      } else if (response.status === 400) {
        setShowToastError(true);
        setMsg("Fail to update film");
        return;
      }
    }
    setLoading(true);
    setShowToastTrue(true);
    setTimeout(() => {
      window.location.href = "/manage-film/film/" + id;
    }, 2000);
  }

  function labelCheckbox() {
    const checkboxes = genre.map((genreObj) => (
      <div
        key={genreObj.genre_id}
        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4"
      >
        <CheckBox
          key={genreObj.genre_id}
          id={genreObj.genre_id?.toString() ?? ""}
          label={genreObj.genre_name}
          htmlFor={genreObj.genre_id?.toString() ?? ""}
          value={genreObj.genre_name}
          onChangeHandler={(isChecked) => {
            if (isChecked) {
              setGenres((prevGenres) => [...prevGenres, genreObj.genre_id!]);
            } else {
              setGenres((prevGenres) =>
                prevGenres.filter((id) => id !== genreObj.genre_id)
              );
            }
          }}
        />
      </div>
    ));

    return checkboxes;
  }

  return (
    <>
      <Toast
        type="check"
        message="Sucesfully updated film"
        showUseState={showToastTrue}
      />
      <Toast type="cross" message={msg} showUseState={showToastError} />
      <Navbar />
      {loading && <Loading />}
      <div className="pt-28 pl-5 sm:pl-10 pr-5 sm:pr-10 lg:pr-28">
        <h1 className="text-center sm:text-left">Edit Film</h1>
        <div className="flex sm:flex-col lg:flex-row">
          <div className="w-full">
            <div className="flex gap-5 sm:flex-col md:flex-col lg:flex-row xl:flex-row">
              <div className="w-1/3">
                <Field
                  type="text"
                  label="Film Name"
                  htmlFor="filmName"
                  required={false}
                  placeholder={film?.title}
                  errorMessage=""
                  value={title}
                  onChangeHandler={(event) => setTitle(event.target.value)}
                />
                <TextArea
                  label="Description"
                  rows={4}
                  required={false}
                  htmlFor="description"
                  placeholder={film?.description}
                  value={description}
                  onChangeHandler={(event) =>
                    setDescription(event.target.value)
                  }
                />
              </div>
              <div className="w-5/12">
                <h3 className="text-center sm:text-left">Genre</h3>
                <div className="flex flex-wrap gap-10">{labelCheckbox()}</div>
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
            <div className="flex flex-row gap-10 pb-5 sm:flex-col md:flex-col lg:flex-row xl:flex-row">
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
        <div className="flex flex-wrap justify-center sm:justify-between md:justify-between pb-5">
          <button
            className="button-red font-bold text-button"
            onClick={() => setIsModalOpen(true)}
          >
            Cancel
          </button>
          <button
            className="button-white font-bold text-button"
            onClick={updateFilm}
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

export default EditFilm;
