import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Field from "../../components/field/Field";
import Dropdown from "../../components/dropdown/Dropdown";
import TextArea from "../../components/textarea/TextArea";
import UploadFile from "../../components/uploadFIle/UploadFile";
import Modal from "../../components/modal/Modal";
import Toast from "../../components/toast/Toast";

function CreateSubmission() {
const [isModalOpen, setIsModalOpen] = useState(false);
const [showToastTrue, setShowToastTrue] = useState(false);
const [showToastError, setShowToastError] = useState(false);

const [film_path, setFilmPath] = useState<File>();
const [film_poster, setPosterPath] = useState<File>();
const [film_header, setHeaderPath] = useState<File>();

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
    window.location.href = "/submission";
  };
  return (
    <>
    <Toast
        type="check"
        message="Sucesfully updated film"
        showUseState={showToastTrue}
      />
      <Toast
        type="cross"
        message="Failed to update film"
        showUseState={showToastError}
      />
      <Navbar />
      <div className="pt-32 pl-10 pr-20">
        <h1>Create Submission</h1>
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
                  errorMessage=""
                />
                <TextArea
                  label="Description"
                  rows={4}
                  required={true}
                  htmlFor="description"
                  placeholder="Add description here..."
                />
              </div>
            </div>
            <Field
              type="date"
              label="Release Date"
              htmlFor="releaseDate"
              required={true}
            />
            <div className="flex flex-row gap-10">
              <Dropdown
                label="Hour"
                htmlFor="hour"
                required={true}
                options={hoursArray}
              />
              <Dropdown
                label="Minute"
                htmlFor="minute"
                required={true}
                options={minutesArray}
              />
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
        <div className="flex flex-wrap justify-between pb-5">
          <button
            className="button-red font-bold text-button"
            onClick={() => setIsModalOpen(true)}
          >
            Cancel
          </button>
          <button
            className="button-white font-bold text-button"
          >
            Submit
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

export default CreateSubmission;
