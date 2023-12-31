import React, { useState } from 'react';

interface CheckBoxProps {
  id: string;
  label: string;
  value: string;
  htmlFor: string;
  onChangeHandler?: (isChecked: boolean) => void;
}

function CheckBox({ id, label, value, htmlFor, onChangeHandler }: CheckBoxProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);

    if (onChangeHandler) {
      onChangeHandler(!isChecked);
    }
  };

  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        value={value}
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="relative peer shrink-0
          appearance-none w-5 h-5 border-2 rounded-sm bg-transparent
          checked:bg-red-600 checked:border-none"
      />
      <label htmlFor={htmlFor} className="ml-2 text-base font-medium text-white">
        {label}
      </label>
      <svg
        className="
          absolute 
          w-4 h-4
          hidden peer-checked:block
          pl-1
          pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );
}

export default CheckBox;
