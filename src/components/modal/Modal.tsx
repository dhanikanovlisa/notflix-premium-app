interface ModalProps {
  title: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

function Modal({title, message, onConfirm, onCancel }: ModalProps) {
  return (
    <div
      tabIndex={-1}
      className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 flex items-center justify-center h-full bg-red-950 bg-opacity-50"
    >
      <div className="relative w-full max-w-md">
        <div className="relative bg-white items-center justify-center rounded-lg h-60 red-glow">
          <div className="p-14 text-center justify-center">
            <h3 className="mb-1 text-black font-bold">{title}</h3>
            <p className="text-black mb-8 text-center">{message}</p>
            <div className="flex justify-center space-x-24">
              <button
                type="button"
                className="text-white button-red hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                onClick={onConfirm}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
