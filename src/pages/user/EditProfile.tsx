import { useState } from "react";
import Field from "../../components/field/Field";
import Navbar from "../../components/navbar/Navbar";
import Modal from "../../components/modal/Modal";
import UploadFile from "../../components/uploadFIle/UploadFile";
import Dropdown from "../../components/dropdown/Dropdown";
import CheckBox from "../../components/checkbox/Checkbox";

function EditProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="pt-28 pl-10">
        <div>
          <h1>Profile Settings</h1>
        </div>
        <div className="flex flex-row gap-12 pt-8">
          <div className="space-y-4">
            <Field
              type="text"
              label="Username"
              htmlFor="username"
              required={false}
              placeholder="Username"
              errorMessage="Username is required"
            />
            <UploadFile
              type="image/*"
              description="Upload your profile picture"
              fileName=""
            />
            <Field
              type="date"
              label="Release Date"
              htmlFor="release date"
              required={false}
              placeholder=""
              errorMessage=""
            />
            <Dropdown 
                label= "Duration"
                htmlFor= "durationFilm"
                required= {false}
                options= {["1", "2"]}
            />
            <CheckBox
              id= "genre"
              label= "Genre"
              htmlFor= "genre"
            />
            <div className="button-container space-x-5">
              <button
                className="text-button button-red font-bold"
                type="button"
                onClick={() => setIsModalOpen(true)}
              >
                Cancel
              </button>
              <button className="text-button button-white font-bold">Save</button>
            </div>
          </div>
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

export default EditProfile;
