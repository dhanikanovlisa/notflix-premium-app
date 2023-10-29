interface FieldProps {
    type: string;
    label: string;
    htmlFor: string;
    required: boolean;
    placeholder: string;
    errorMessage: string;
    icon?: React.ReactNode; 
  }
  
  function Field({ type, label,htmlFor, required, placeholder, errorMessage, icon, half }: FieldProps) {
    return (
      <div className={`${half && "w-1/2"}`}>
        <label
          className="md:flex md:items-center mb-1 font-bold"
          htmlFor={htmlFor}
        >
          {label}
          {required ? <span className="pl-1 text-red-700 font-bold">*</span> : null}
        </label>
        <div className=""> {/* Add a container for the icon */}
          {icon && <div className="mr-2">{icon}</div>} {/* Render the icon if it's provided */}
          <input
            className={`"bg-white appearance-none rounded-md w-64 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-500 " ${half && "w-full"}`}
            id={htmlFor}
            type={type}
            placeholder={placeholder}
            required={required}
          />
        </div>
        <div className="text-red text-xs mt-1">{errorMessage}</div>
        
      </div>
    );
  }
  
  export default Field;
  