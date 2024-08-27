import { formatDate } from "@/components/utils/forms";
import clsx from "clsx";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const DatePickerInput = (props: any) => {
  const { error, isFill, classNameContainer, setValue, name } = props;
  const [value, onChange] = useState<Value>(new Date());

  React.useEffect(() => {
    setValue(name, value ? formatDate(value) : "");
  }, [value]);

  return (
    <div>
      <DatePicker
        {...props}
        dateFormat="dd MMMM yyyy"
        selectsRange={true}
        placeholderText="Ingresa una fecha"
        onChange={onChange}
        selected={value}
        className={clsx(
          {
            "!border-alert-error focus:border-alert-error !placeholder-alert-error focus:ring-transparent":
              error === false,
          },
          {
            "!text-alert-error ": error,
          },

          //Styles normal input
          {
            "bg-gray-opacity-10 outline-none ring-offset-transparent ring-opacity-0 border-gray-opacity-10 ring-transparent":
              !isFill && !error,
          },
          "placeholder-[#989898] font-[500] py-3 px-6 w-full border",
          {
            "border-gray-500": !error && !isFill,
          },
          "disabled:placeholder-gray-600 disabled:cursor-not-allowed disabled:text-gray-500",
          "bg-[#F4F4F4] text-[#989898] border border-white rounded-lg p-2 roboto",
          {
            "focus:outline-none focus:bg-gray-opacity-10 focus:ring-offset-transparent focus:ring-opacity-0 focus:border-white focus:ring-transparent":
              !error,
          },
          classNameContainer,
        )}
      />
    </div>
  );
};
