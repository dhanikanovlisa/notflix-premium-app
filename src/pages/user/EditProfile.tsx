import Field from "../../components/field/Field";
import Navbar from "../../components/navbar/Navbar";
import UploadFile from "../../components/uploadFIle/UploadFile";

function EditProfile() {
  return (
    <>
      <Navbar />
      <div className="pt-28 pl-10">
        <div className="">
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
            />
            <Field
              type="text"
              label="First Name"
              htmlFor="firstname"
              required={false}
              placeholder="First Name"
            />
            <Field
              type="text"
              label="Last Name"
              htmlFor="lastname"
              required={false}
              placeholder="Last Name"
            />
            <Field
              type="text"
              label="Email"
              htmlFor="email"
              required={false}
              placeholder="Email"
            />
            <Field
              type="text"
              label="Phone Number"
              htmlFor="phonenumber"
              required={false}
              placeholder="Phone Number"
            />
            <UploadFile
              type="image/*"
              description="Upload your profile picture"
            />
          <div className="button-container space-x-5">
            <button className="text-button button-red font-bold">Cancel</button>
            <button className="text-button button-white font-bold">Save</button>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
