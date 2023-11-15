interface CardProps {
  title: string;
  description: string;
  onAccept?: () => void;
  onReject?: () => void;
}

function CardApproval({ title, description, onAccept, onReject }: CardProps) {
  return (
      <div className="w-1/2 h-full red-glow p-6 rounded-md flex flex-col lg:flex-row space-x-6">
        <div className="mb-4">
          <h3>{title}</h3>
          <p className="text-sm"> {description}</p>
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
