import { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
function DetailFilm() {
  useEffect(() => {
    document.title = "Film"; //isi nama filmnya nanti
  });

  return (
    <>
      <Navbar />
      <div className="pt-28 pl-10 pr-28">
        <h2>Film Name</h2>
        <div className="flex flex-row gap-10 pt-5">
        <div className="">
          <div className="w-48 h-full">
            <div className="w-48 h-60 red-glow rounded-md overflow-hidden">
              <img
                src="/src/assets/placeholder-image.webp"
                alt="Placeholder"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="w-1/3 space-y-2 pb-2">
          <div className="">
            <div>
              <h3>Descirption</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Adipisci laudantium sunt eveniet, officiis sit sint voluptas
                eius rem necessitatibus, ullam blanditiis. Dolores obcaecati
                fugiat magni officia quos exercitationem magnam cumque.
              </p>
            </div>
            <div>
              <h3>Genre</h3>
              <p>Action</p>
            </div>
            <div>
              <h3>Release Year</h3>
              <p>2023-12-12</p>
            </div>
            <div>
              <h3>Duration</h3>
              <p>123 minutes</p>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <button className="button-red font-bold text-button">Delete</button>
            <button className="button-white font-bold text-button">Edit</button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default DetailFilm;
