interface UploadFileProps {
  type: string;
  htmlFor: string;
  description: string;
  file?: File;
  required?: boolean;
  errorMessage?: string;
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function UploadFile({ type, htmlFor, description, file, required, errorMessage, onChangeHandler }: UploadFileProps) {
  let maxSizeInBytes;

  if (type.startsWith('image')) {
    maxSizeInBytes = 800 * 1024 ;
  } else if (type.startsWith('video')) {
    maxSizeInBytes = 9 * 1024 * 1024 ;
  } else {
    maxSizeInBytes = 0;
  }

  let error = "";

  if (file && file.size > maxSizeInBytes) {
    if(type.startsWith('image')){
      error = `File size must be less than 800 KB`;
    } else {
      error = `File size must be less than 9 MB`;
    }
  }


  return (
    <div className="flex items-center justify-center w-96">
      <div className="w-full">
        <label
          htmlFor={htmlFor}
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-red-950 border-dashed rounded-lg cursor-pointer bg-red-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-white">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-white">{description}</p>
          </div>
          <input id={htmlFor} name={htmlFor} type="file" accept={type} className="hidden" required={required} onChange={onChangeHandler} />
        </label>
        <p className="text-sm">File Name: {file?.name}</p>
        <div className="text-red text-xs mt-1">{error === "" ? (errorMessage) : error}</div>
      </div>
    </div>
  );
}

export default UploadFile;
