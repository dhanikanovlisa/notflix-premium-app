interface UploadFileProps {
  type: string;
  htmlFor: string;
  description: string;
  fileName?: string;
  value?: any;
  onChangeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
function UploadFile({ type, htmlFor, description, fileName, onChangeHandler }: UploadFileProps) {
  return (
    <div className="flex items-center justify-center w-96">
      <div className="w-full">
        <label
          htmlFor={htmlFor}
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-red-950 border-dashed rounded-lg cursor-pointer bg-red-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-whit"
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
            <p className="mb-2 text-sm text-whit">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-whit">{description}</p>
          </div>
          <input id={htmlFor} type="file" accept={type} className="hidden"
          onChange={onChangeHandler} />
        </label>
        <p className="text-sm">File Name: {fileName}</p>
      </div>
    </div>
  );
}

export default UploadFile;
