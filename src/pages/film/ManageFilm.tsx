import { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import CardFilm from "../../components/cardFilm/CardFilm";

function ManageFilm() {
  useEffect(() => {
    document.title = "Manage Film";
  });

  function loopCardFilm() {
    const cards = [];
    for (let i = 0; i < 12; i++) {
      cards.push(
        <CardFilm
          key={i}
          title={`Film ${i + 1}`}
          image="/src/assets/placeholder-image.webp"
        />
      );
    }
    return cards;
  }

  return (
    <>
      <Navbar />
      <div className="pt-28 pl-10 pr-28">
        <h2>Manage Film</h2>
        <div className="pt-5 flex flex-wrap gap-12 justify-center">{loopCardFilm()}</div>
      </div>
    </>
  );
}

export default ManageFilm;
