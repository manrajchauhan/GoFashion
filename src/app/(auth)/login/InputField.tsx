import * as React from "react";
import { InputFieldProps } from "./types";

export const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, required = false }) => {
  const inputId = `${label.toLowerCase()}-input`;

  return (
    <div className="flex flex-col mt-3.5 w-full whitespace-nowrap">
      <label htmlFor={inputId} className="flex gap-0.5 items-center self-start text-center text-sm">
        <div className="self-stretch my-auto text-gray-700">{label}</div>
        {required && <div className="self-stretch my-auto text-neutral-900">*</div>}
      </label>
      <div className={`flex overflow-hidden items-center mt-1.5 w-full bg-white rounded-md border ${type === 'password' ? 'border-zinc-300' : ''} min-h-[30px] ${type === 'password' ? 'text-neutral-600 tracking-[3.02px]' : 'text-neutral-900'}`}>
        <div className="flex overflow-hidden flex-1 shrink gap-1.5 items-center self-stretch py-2.5 pr-1.5 pl-2.5 my-auto w-full rounded-md border border-solid basis-0 border-neutral-400 min-h-[20px] min-w-[240px]">
          <input
            id={inputId}
            type={type}
            value={value}
            onChange={onChange}
            className="flex-1 shrink gap-1.5 self-stretch my-auto w-full outline-none border-none bg-transparent"
            required={required}
            aria-required={required}
          />
        </div>
      </div>
    </div>
  );
};
