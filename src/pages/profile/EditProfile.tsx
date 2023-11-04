import { useState } from "react";
import Field from "../../components/field/Field";
import Navbar from "../../components/navbar/Navbar";
import Modal from "../../components/modal/Modal";
import UploadFile from "../../components/uploadFIle/UploadFile";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { User } from "../../interfaces/interfaces";
import Toast from "../../components/toast/Toast";

function EditProfile() {
  const { id } = useParams();
  const url = import.meta.env.VITE_REST_URL;
  const [profile, setProfile] = useState<User | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToastTrue, setShowToastTrue] = useState(false);
  const [showToastError, setShowToastError] = useState(false);

  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [photo_profile, setPhotoProfile] = useState<string | undefined>("");

  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState<string>("");
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");

  const handleUsernameKeyUp = async () => {
    try {
      const res = await fetch(`${url}/check/username/${username}`);
      const data = await res.json();
      if (res.ok && data.code === 1) {
        setIsUsernameValid(false);
        setUsernameErrorMsg(data.message);
      } else {
        setIsUsernameValid(true);
        setUsernameErrorMsg('');
      }
    } catch (error) {
      console.error("Error fetching username", error);
    }
  };

  const handleEmailKeyUp = async () => {
    try {
      const res = await fetch(`${url}/check/email/${email}`);
      const data = await res.json();
      if (res.ok && data.code === 1) {
        setIsEmailValid(false);
        setEmailErrorMsg(data.message);
      } else {
        setIsEmailValid(true);
        setEmailErrorMsg('');
      }
    } catch (error) {
      console.error("Error fetching email", error);
    }
  };

  async function getProfile() {
    const response = await fetch(`${url}/profile/${id}`);
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 404) {
        setProfile(undefined);
        window.location.href = "/not-found";
        return;
      }
    }
    const mappedProfile = data.data;
    setProfile(mappedProfile);
  }

  async function saveProfile() {
    try {
      const res = await fetch(`${url}/check/username/${username}`);
      const data = await res.json();
      if (res.ok && data.code == 1) {
        setIsUsernameValid(false);
        setUsernameErrorMsg(data.message);
        return;
      }
    } catch (error) {
      console.error("Error fetching username", error);
    }

    try {
      const res = await fetch(`${url}/check/email/${email}`);
      const data = await res.json();
      if (res.ok && data.code == 1) {
        setIsEmailValid(false);
        setEmailErrorMsg(data.message);
        return;
      }
    } catch (error) {
      console.error("Error fetching email", error);
    }

    try {
      const response = await fetch(`${url}/profile/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          last_name,
          first_name,
          email,
          phone_number,
          photo_profile,
        }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          setShowToastError(true);
          setProfile(undefined);
          return;
        }
      }
      setShowToastTrue(true);
      setTimeout(() => {
        window.location.href = "/profile/" + id;
      }, 2000);
    } catch (error) {
      setShowToastError(true);
      console.error("Error registering", error);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    window.location.href = "/profile/" + id;
  };

  return (
    <>
      <Toast
        type="check"
        message="Sucesfully updated profile"
        showUseState={showToastTrue}
      />
      <Toast
        type="cross"
        message="Failed to update profile"
        showUseState={showToastError}
      />
      <Navbar />
      <div className="pt-28 pl-10 pb-10">
        <div>
          <h1>Profile Settings</h1>
        </div>
        <div className="flex flex-row gap-12 pt-2">
          <div className="space-y-4">
            <Field
              type="text"
              label="Username"
              htmlFor="username"
              required={false}
              placeholder={profile?.username}
              errorMessage={usernameErrorMsg}
              value={username}
              onChangeHandler={(event) => setUsername(event.target.value)}
              onKeyUp={handleUsernameKeyUp}
            />
            <div className="flex gap-2">
              <Field
                type="text"
                label="First Name"
                htmlFor="firstName"
                required={false}
                placeholder={profile?.first_name}
                errorMessage=""
                half={true}
                value={first_name}
                onChangeHandler={(event) => setFirstName(event.target.value)}
                  
              />
              <Field
                type="text"
                label="Last Name"
                htmlFor="Doe"
                required={false}
                placeholder={profile?.last_name}
                errorMessage=""
                half={true}
                value={last_name}
                onChangeHandler={(event) => setLastName(event.target.value)}
              />
            </div>
            <Field
              type="email"
              label="Email"
              htmlFor="email"
              required={false}
              placeholder={profile?.email}
              errorMessage={emailErrorMsg}
              value={email}
              onChangeHandler={(event) => setEmail(event.target.value)}
              onKeyUp={handleEmailKeyUp}
            />
            <Field
              type="text"
              label="Phone Number"
              htmlFor="phoneNumber"
              required={false}
              placeholder={profile?.phone_number}
              errorMessage=""
              value={phone_number}
              onChangeHandler={(event) => setPhoneNumber(event.target.value)}
            />
            <UploadFile
              type="image/*"
              htmlFor="profilePicture"
              description="Upload your profile picture"
              fileName={photo_profile}
              onChangeHandler={(event) =>
                setPhotoProfile(event.target.files?.[0].name)
              }
            />

            <div className="button-container space-x-5">
              <button
                className="text-button button-red font-bold"
                type="button"
                onClick={() => setIsModalOpen(true)}
              >
                Cancel
              </button>
              <button
                className="text-button button-white font-bold"
                onClick={saveProfile}
              >
                Save
              </button>
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
