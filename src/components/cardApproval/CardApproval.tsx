interface CardProps {
  title: string;
  description: string;
  onAccept?: () => void;
  onReject?: () => void;
}

function CardApproval({ title, description, onAccept, onReject }: CardProps) {
  return (
    <div className="sm:w-full xl:w-5/12">
      <div className="w-full h-full red-glow p-6 rounded-md flex flex-col sm:flex-col sm:space-y-4 xl:flex-row xl:space-x-7 justify-center items-center">
        <div className="mb-4">
          <h3>{title}</h3>
          <p className="text-center text-sm">Created At {description}</p>
        </div>
        <div className="flex flex-row gap-3">
          <button
            type="button"
            className="text-white button-red hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            onClick={onReject}
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            onClick={onAccept}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardApproval;
