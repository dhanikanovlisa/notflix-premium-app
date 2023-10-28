interface CardFilmProps {
    title: string;
    image?: string;
  }
  
  function CardFilm({ title, image }: CardFilmProps) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-52 h-64 red-glow rounded-md overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="mt-2">{title}</h3>
      </div>
    );
  }
  
  export default CardFilm;
  