import { getAPI } from "../../utils/api";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { User } from "../../types/interfaces";
import Loading from "../../components/loading/Loading";
import { useEffect, useState } from "react";

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState<User | undefined>();
  const [valid, setValid] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Profile";
    if (Number(id) !== Number(localStorage.getItem("id"))) {
      setValid(false);
      window.location.href = "/not-found";
    }
  }, []);

  async function getProfile() {
    try {
      const response = await getAPI(`profile/${Number(id)}`) ;
      const data = await response.json();
      const mappedProfile = data.data;
      setProfile(mappedProfile);
    } catch (error) {
      console.error("Erro fetching profile", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  function editProfile() {
    window.location.href = "/profile/edit/" + Number(id);
  }

  return (
    <>
      {valid && (
        <>
          <Navbar />
          {loading && <Loading />}
          <div className="pt-28 pl-10">
            <div className="">
              <h1>Profile Settings</h1>
            </div>
            <div className="flex flex-row gap-36 pt-8">
              <div>
                <div className="w-48 h-48">
                  <img
                    src={`/src/assets/storage/profile/${profile?.photo_profile}`}
                    className="rounded-full object-cover w-full h-full"
                    alt="Profile picture"
                  />
                </div>
              </div>
              <div className="space-y-8">
                <div className="username-container">
                  <h3>Username</h3>
                  <p>{profile?.username}</p>
                </div>
                <div className="username-container">
                  <h3>Name</h3>
                  <p>
                    {profile?.first_name} {profile?.last_name}{" "}
                  </p>
                </div>
                <div className="username-container">
                  <h3>Email</h3>
                  <p>{profile?.email}</p>
                </div>
                <div className="username-container">
                  <h3>Phone Number</h3>
                  <p>{profile?.phone_number}</p>
                </div>
                <button
                  className="font-bold button-white"
                  onClick={editProfile}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default Profile;
