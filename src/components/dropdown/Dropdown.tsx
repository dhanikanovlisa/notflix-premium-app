interface DropdownProps {
  label: string;
  htmlFor: string;
  required: boolean;
  options: string[] | number[];
  onChangeHandler?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Dropdown({ label, htmlFor, required, options, onChangeHandler }: DropdownProps) {
  return (
    <div className="flex flex-col space-y-1">
      <label
        htmlFor={htmlFor}
        className="md:flex md:items-center font-bold"
      >
        {label}
        {required ? (
          <span className="pl-1 text-red-700 font-bold">*</span>
        ) : null}
      </label>
      <div className="relative inline-block w-24">
        <select
          className="appearance-none w-full bg-white border border-gray-300 rounded-md py-2 px-5 text-black inline-flex items-center"
          id={htmlFor}
          name={htmlFor}
          style={{ color: 'black' }} 
          onChange={onChangeHandler}
        >
          {options.map((option, index) => (
            <option
              key={index}
              value={option}
              className="text-black"
            >
              {option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 320 512"
          >
            <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
