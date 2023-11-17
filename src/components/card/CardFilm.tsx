interface CardFilmProps {
  id: number,
  title: string;
  image?: string;
}

function CardFilm({ id, title, image }: CardFilmProps) {
  return (
    <a href={`/manage-film/film/${id}`}>
      <div className="w-48 h-full">
      <div className="w-48 h-60 red-glow rounded-md overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <h3 className="mt-2 text-white text-center">{title}</h3>
    </div>
    </a>
  );
}

export default CardFilm;
