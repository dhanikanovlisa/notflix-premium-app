import Navbar from "../../components/navbar/Navbar";

function Profile() {
  return (
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
                src="/src/assets/profile-placeholder.png"
                className="rounded-full object-cover w-full h-full"
              />
            </div>
          </div>
          <div className="space-y-8">
            <div className="username-container">
              <h3>Username</h3>
              <p>Username</p>
            </div>
            <div className="username-container">
              <h3>Name</h3>
              <p>Dhanika Novlisariyanti</p>
            </div>
            <div className="username-container">
              <h3>Email</h3>
              <p>email@gmail.com</p>
            </div>
            <div className="username-container">
              <h3>Phone Number</h3>
              <p>phone</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
