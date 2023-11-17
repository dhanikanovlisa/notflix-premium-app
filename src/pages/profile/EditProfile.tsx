import { useState } from "react";
import Field from "../../components/field/Field";
import Navbar from "../../components/navbar/Navbar";
import Modal from "../../components/modal/Modal";
import UploadFile from "../../components/uploadFIle/UploadFile";
import Loading from "../../components/loading/Loading";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { User } from "../../types/interfaces";
import Toast from "../../components/toast/Toast";
import { getAPI, putAPI } from "../../utils/api";
import { useAuth } from "../../hooks/useAuth";

function EditProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState<User | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toastTrueUseState = useState(false);
  const toastErrorUseState = useState(false);
  const [showToastTrue, setShowToastTrue] = toastTrueUseState;
  const [showToastError, setShowToastError] = toastErrorUseState;
  const [msg, setMsg] = useState("");
  const [valid, setValid] = useState(true);

  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [photo_profile, setPhotoProfile] = useState<File>();

  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [usernameErrorMsg, setUsernameErrorMsg] = useState<string>("");
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");

  const [loading, setLoading] = useState(true);
  const {isAuth} = useAuth();

  useEffect(() => {
    document.title = "Edit Profile";
    if (!isAuth()) {
      window.location.href = "/404";
    }

    if (id !== localStorage.getItem("id")) {
      setValid(false);
      window.location.href = "/404";
    }
  }, []);

  async function getProfile() {
    try {
      const response = await getAPI(`profile/${Number(id)}`);
      const data = await response.json();
      const mappedProfile = data.data;
      setProfile(mappedProfile);
    } catch (error) {
      console.error("Erro fetching profile", error);
    } finally {
      setLoading(false);
    }
  }

  const handleUsernameKeyUp = async () => {
    try {
      if (username === profile?.username) {
        return;
      } else {
        const res = await getAPI(`check/username/${username}`);
        const data = await res.json();
        if (res.ok && data.code === 1) {
          setIsUsernameValid(false);
          setUsernameErrorMsg(data.message);
        } else {
          setIsUsernameValid(true);
          setUsernameErrorMsg("");
        }
      }
    } catch (error) {
      console.error("Error fetching username", error);
    }
  };

  const handleEmailKeyUp = async () => {
    try {
      if (email == profile?.email) {
        return;
      } else {
        const res = await getAPI(`check/email/${email}`);
        const data = await res.json();
        if (res.ok && data.code === 1) {
          setIsEmailValid(false);
          setEmailErrorMsg(data.message);
        } else {
          setIsEmailValid(true);
          setEmailErrorMsg("");
        }
      }
    } catch (error) {
      console.error("Error fetching email", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  async function saveProfile() {
    try {
      setLoading(true);
      const profileName = photo_profile?.name;
      const profileSize = photo_profile?.size;
      const response = await putAPI(`profile/edit/${id}`, {
        username,
        last_name,
        first_name,
        email,
        phone_number,
        profileName,
        profileSize,
      });

      if (!response.ok) {
        if (response.status === 404) {
          setLoading(false);
          setShowToastError(true);
          setMsg("Profile not found");
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
        window.location.href = "/profile/" + id;
      }, 2000);
    } catch (error) {
      setShowToastError(true);
      console.error("Error registering", error);
    }
  }

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    window.location.href = "/profile/" + id;
  };

  return (
    <>
      {valid && (
        <>
          <Toast
            type="check"
            message="Sucesfully updated profile"
            showUseState={toastTrueUseState}
          />
          <Toast type="cross" message={msg} showUseState={toastErrorUseState} />
          <Navbar />
          {loading && <Loading />}
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
                <div className="flex gap-2 flex-col lg:flex-row">
                  <Field
                    type="text"
                    label="First Name"
                    htmlFor="firstName"
                    required={false}
                    placeholder={profile?.first_name}
                    errorMessage=""
                    half={true}
                    value={first_name}
                    onChangeHandler={(event) =>
                      setFirstName(event.target.value)
                    }
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
                  onChangeHandler={(event) =>
                    setPhoneNumber(event.target.value)
                  }
                />
                <UploadFile
                  type="image/*"
                  htmlFor="profilePicture"
                  description="Upload your profile picture"
                  file={photo_profile}
                  onChangeHandler={(event) =>
                    setPhotoProfile(event.target.files?.[0])
                  }
                />

                <div className="flex flex-wrap justify-between">
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
      )}
    </>
  );
}

export default EditProfile;
