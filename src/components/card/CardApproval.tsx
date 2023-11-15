interface CardProps {
  title: string;
  description: string;
  onAccept?: () => void;
  onReject?: () => void;
}

function CardApproval({ title, description, onAccept, onReject }: CardProps) {
  return (
      <div className="w-72 sm:w-96 md:w-96 lg:w-96 h-full red-glow p-6 rounded-md flex flex-wrap flex-col sm:flex-row md:flex-row lg:flex-row sm:space-x-6 md:space-x-6 lg:space-x-6 sm:items-center md:items-center lg:items-center">
        <div className="mb-4">
          <h3 className="text-left">{title}</h3>
          <p className="text-left text-sm"> {description}</p>
        </div>
        <div className="flex flex-row space-x-3">
          <button
            type="button"
            className="text-white h-10 font-bold button-red hover:bg-red-800"
            onClick={onReject}
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-white h-10 font-bold bg-green-600 hover:bg-green-800 "
            onClick={onAccept}
          >
            Save
          </button>
        </div>
      </div>
  );
}

export default CardApproval;
