import { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Field from "../../components/field/Field";
import Dropdown from "../../components/dropdown/Dropdown";
import UploadFile from "../../components/uploadFIle/UploadFile";
import CheckBox from "../../components/checkbox/Checkbox";
import TextArea from "../../components/textarea/TextArea";

function EditFilm() {
  useEffect(() => {
    document.title = "Edit Film";
  });
  function labelCheckbox() {
    const data = [
      "Action",
      "Adventure",
      "Animation",
      "Comedy",
      "Crime",
      "Documentary",
      "Drama",
      "Family",
      "Fantasy",
      "History",
      "Horror",
      "Music",
      "Mystery",
      "Romance",
      "Science Fiction",
      "TV Movie",
      "Thriller",
      "War",
      "Western",
    ];
    const checkboxes = [];
  
    for (let i = 0; i < data.length; i++) {
      checkboxes.push(
        <CheckBox
          key={i}
          id={data[i]}
          label={data[i]}
          htmlFor={data[i]}
          value={data[i]}
        />
      );
    }
  
    return checkboxes;
  }
  
  return (
    <>
      <Navbar />
      <div className="pt-28 pl-10 w-11/12 h-full">
        <h1>Edit Film</h1>
        <div>
          <div className="space-y-5">
            <div className="flex flex-row gap-20">
            <div className="w-2/6">
              <Field
                type="text"
                label="Film Name"
                htmlFor="filmName"
                required={false}
                placeholder="Film Name"
                errorMessage=""
              />
              <TextArea 
                label="Description"
                rows={4}
                required = {false}
                htmlFor="description"
                placeholder="Enter film description..."
              />
            </div>
            <div className="h-full w-2/6">
                <h3>Genre</h3>
            <div className="flex flex-wrap gap-4">
                {labelCheckbox()}</div>
            </div>
            </div>
            <Field
              type="date"
              label="Release Date"
              htmlFor="releaseDate"
              required={false}
            />
            <div className="flex flex-row gap-10">
              <Dropdown
                label="Hour"
                htmlFor="hour"
                required={false}
                options={[
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                ]}
              />
              <Dropdown
                label="Minute"
                htmlFor="minute"
                required={false}
                options={[
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                ]}
              />
            </div>
            <div className="flex flex-row gap-10 pb-5">
              <UploadFile
                type="image/*"
                htmlFor="poster"
                description="Upload Film Poster (max 800KB)"
                fileName=""
              />
              <UploadFile
                type="image/*"
                htmlFor="header"
                description="Upload Film Header (max 800KB)"
                fileName=""
              />
              <UploadFile
                type="video/*"
                htmlFor="video"
                description="Upload Film Poster max(9 MB)"
                fileName=""
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between pb-5">
            <button className="button-red font-bold text-button">Cancel</button>
            <button className="button-white font-bold text-button">Save</button>
        </div>
      </div>
    </>
  );
}

export default EditFilm;
