import { useEffect, useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Field from "../../../components/field/Field";
import Dropdown from "../../../components/dropdown/Dropdown";
import TextArea from "../../../components/textarea/TextArea";
import UploadFile from "../../../components/uploadFIle/UploadFile";
import Modal from "../../../components/modal/Modal";
import Toast from "../../../components/toast/Toast";
import Loading from "../../../components/loading/Loading";
import { postAPI } from "../../../utils/api";
import { useAuth } from "../../../hooks/useAuth";

function CreateSubmission() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toastTrueUseState = useState(false);
  const toastErrorUseState = useState(false);
  const [showToastTrue, setShowToastTrue] = toastTrueUseState;
  const [showToastError, setShowToastError] = toastErrorUseState;
  const [user_id, setId] = useState<number>(0);
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

  const [titleMsg, setTitleMsg] = useState("");
  const [hourMsg, setHourMsg] = useState("");
  const [minuteMsg, setMinuteMsg] = useState("");
  const [dateMsg, setDateMsg] = useState("");

  const {isAuth, isAdmin} = useAuth();


  const [msg, setMsg] = useState("");

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
    window.location.href = "/submission/" + user_id;
  };

  useEffect(() => {
    document.title = "Manage Film";
    if (!isAuth() || isAdmin()) {
      window.location.href = "/404";
    }
  });

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    if(title === ""){
      setTitleMsg("Title must not be empty");
    } else {
      setTitleMsg("");
    }
    
    if(date_release === ""){
      setDateMsg("Date must not be empty");
    } else {
      setDateMsg("");
    }

    if(hour === 0){
      setHourMsg("Hour must not be empty");
    } else {
      setHourMsg("");
    }

    if(minute === 0){
      setMinuteMsg("Minute must not be empty");
    } else {
      setMinuteMsg("");
    }
    setLoading(true);

    if(film_poster?.name === null){
      setMsg("Film poster is empty");
      setShowToastError(true);
    }

    const filmName = film_path?.name;
    const posterName = film_poster?.name;
    const headerName = film_header?.name;
    const filmPathSize = film_path?.size;
    const posterPathSize = film_poster?.size;
    const headerPathSize = film_header?.size;
    const response = await postAPI(`films/createFilmRequest`, {
      id: user_id,
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
    })

    console.log(response.body);
    if (!response.ok) {
      if (response.status === 404) {
        setLoading(false);
        setShowToastError(true);
        return;
      } else if (response.status === 400) {
        setLoading(false);
        const errorMsg = await response.json();
        setShowToastError(true);
        setMsg(errorMsg?.error);
        return;
      }
    }
    setShowToastTrue(true);
    setTimeout(() => {
      window.location.href = "/submission/" + user_id;
    }, 2000);
  };

  useEffect(() => {
    setId(Number(localStorage.getItem("id")));
  }, [user_id]);




  return (
    <>
      <Toast
        type="check"
        message="Sucesfully updated film"
        showUseState={toastTrueUseState}
      />
      <Toast type="cross" message={msg} showUseState={toastErrorUseState} />
      <Navbar />
      <div className="pt-32 pl-10 pr-20">
        {loading && <Loading />}
        <h1>Create Submission</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="space-y-5">
              <div className="flex flex-row gap-20">
                <div className="w-2/6">
                  <Field
                    type="text"
                    label="Film Name"
                    htmlFor="filmName"
                    required={true}
                    placeholder="Add film name here"
                    errorMessage={titleMsg}
                    value={title}
                    onChangeHandler={(event) => setTitle(event.target.value)}
                  />
                  <TextArea
                    label="Description"
                    rows={4}
                    required={true}
                    htmlFor="description"
                    placeholder="Add description here..."
                    value={description}
                    onChangeHandler={(event) =>
                      setDescription(event.target.value)
                    }
                  />
                </div>
              </div>
              <Field
                type="date"
                label="Release Date"
                htmlFor="releaseDate"
                required={true}
                errorMessage={dateMsg}
                value={date_release}
                onChangeHandler={(event) => setReleaseDate(event.target.value)}
              />
              <div className="flex flex-row gap-10">
                <Dropdown
                  label="Hour"
                  htmlFor="hour"
                  required={true}
                  options={hoursArray}
                  errorMessage={hourMsg}
                  onChangeHandler={(event) =>
                    setHour(Number(event.target.value))
                  }
                />
                <Dropdown
                  label="Minute"
                  htmlFor="minute"
                  required={true}
                  options={minutesArray}
                  errorMessage={minuteMsg}
                  onChangeHandler={(event) =>
                    setMinute(Number(event.target.value))
                  }
                />
              </div>
              <div className="flex flex-col gap-10 pb-5 lg:flex-row ">
                <UploadFile
                  type="image/*"
                  htmlFor="poster"
                  description="Upload Film Poster (max 800KB)"
                  file={film_poster}
                  required={true}
                  onChangeHandler={(event) =>
                    setPosterPath(event.target.files?.[0])
                  }
                />
                <UploadFile
                  type="image/*"
                  htmlFor="header"
                  description="Upload Film Header (max 800KB)"
                  file={film_header}
                  required={true}
                  onChangeHandler={(event) =>
                    setHeaderPath(event.target.files?.[0])
                  }
                />
                <UploadFile
                  type="video/*"
                  htmlFor="video"
                  description="Upload Film Poster (max 9 MB)"
                  file={film_path}
                  required={true}
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
            type="button"
          >
            Cancel
          </button>
          <button
            className="button-white font-bold text-button"
            type="submit"
          >
            Submit
          </button>
        </div>
        </form>
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

export default CreateSubmission;
