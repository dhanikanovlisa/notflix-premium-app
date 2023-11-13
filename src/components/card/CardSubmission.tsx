import StatusComponent from "../status/StatusComponent";

interface Status {
  status: string;
}

interface CardProps {
  id: number;
  image: string | undefined;
  title: string;
  description: string;
  status: Status;
}

function CardSubmission({ id, image, title, description, status }: CardProps) {
  return (
    <a href ={`/submission/film/${id}`}>
      <div className="w-52 h-full red-glow p-6 rounded-md justify-center items-center">
      <div className="mb-6">
        <img src={image} alt={title} className="rounded-lg" />
      </div>
      <div className="justify-center items-center text-center space-y-2">
        <div>
          <h3>{title}</h3>
          <p className="text-center text-sm">{description}</p>
        </div>
        <div className="flex justify-center items-center">
          <StatusComponent status={status.status} />
        </div>
      </div>
    </div>
    </a>
  );
}

export default CardSubmission;
