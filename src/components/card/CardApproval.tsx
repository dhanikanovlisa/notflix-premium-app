interface CardProps {
  title: string;
  description: string;
  onAccept?: () => void;
  onReject?: () => void;
}

function CardApproval({ title, description, onAccept, onReject }: CardProps) {
  return (
      <div className="w-full sm:w-full md:w-10/12 lg:w-96 red-glow p-6 rounded-md flex flex-wrap flex-col justify-between">
        <div className="mb-4">
          <h3 className="text-left mb-4">{title}</h3>
          <p className="text-left text-sm"> {description}</p>
        </div>
        <div className="flex flex-row space-x-3 justify-center">
          <button
            type="button"
            className="text-white h-10 font-bold button-red hover:bg-red-800"
            onClick={onReject}
          >
            Reject
          </button>
          <button
            type="button"
            className="text-white h-10 font-bold bg-green-600 hover:bg-green-800 "
            onClick={onAccept}
          >
            Accept
          </button>
        </div>
      </div>
  );
}

export default CardApproval;
