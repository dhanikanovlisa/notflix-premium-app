import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import { User } from "../../interfaces/interfaces";
import { useEffect, useState } from "react";
function Profile() {
  const { id } = useParams();
  const url = import.meta.env.VITE_REST_URL;
  const [profile, setProfile] = useState<User | undefined>();

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

  useEffect(() => {
    getProfile();
  }, []);

  function editProfile() {
    window.location.href = "/profile/edit" + id;
  }

  return (
    <>
      {profile && (
        <>
          <Navbar />
          <div className="pt-28 pl-10">
            <div className="">
              <h1>Profile Settings</h1>
            </div>
            <div className="flex flex-row gap-36 pt-8">
              <div>
                <div className="w-48 h-48">
                  <img
                    src={`/src/assets/storage/profile/${profile.photo_profile}`}
                    className="rounded-full object-cover w-full h-full"
                    alt = "Profile picture"
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
                  <p>{profile?.first_name} {profile?.last_name} </p>
                </div>
                <div className="username-container">
                  <h3>Email</h3>
                  <p>{profile.email}</p>
                </div>
                <div className="username-container">
                  <h3>Phone Number</h3>
                  <p>{profile.phone_number}</p>
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
