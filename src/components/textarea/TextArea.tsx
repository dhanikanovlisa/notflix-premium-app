
interface TextAreaProps {
  label: string;
  rows: number;
  required: boolean;
  htmlFor: string;
  placeholder?: string;
  value?: string;
  onChangeHandler?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea({
  label,
  rows,
  required,
  htmlFor,
  placeholder,
  value,
  onChangeHandler
}: TextAreaProps) {
  return (
    <div>
      <label
        className="md:flex md:items-center mb-1 font-bold"
        htmlFor={htmlFor}
      >
        {label}
        {required ? (
          <span className="pl-1 text-red-700 font-bold">*</span>
        ) : null}
      </label>
      <textarea
        id={htmlFor}
        rows={rows}
        className="block w-full h-32 p-4 text-base text-gray-900 bg-gray-50 rounded-lg border  "
        placeholder={placeholder}
        required={required}
        value = {value}
        onChange={onChangeHandler}
      ></textarea>
    </div>
  );
}

export default TextArea;
