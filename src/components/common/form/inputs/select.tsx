import * as React from "react";
import clsx from "clsx";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

export const Select: React.FC<
  any & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  name,
  title,
  isFill,
  register,
  rules,
  rightImg,
  leftImg,
  rightClick,
  leftClick,
  placeholder,
  onChangeCustom,
  error,
  className,
  classNameContainer,
  InputSelect,
  labelVisible,
  verifyValue,
  handleVerification,
  primary,
  reset,
  options,
  withoutX = false,
  value,
  ...props
}) => {
  //@typescript-eslint/no-unused-vars

  const [option, setOption] = React.useState(value || "");
  React.useEffect(() => {
    setOption(value);
  }, [value]);

  const [showLabel, setShowLabel] = React.useState(false);
  const registerAux = register(name, rules);
  console.log(value);
  return (
    <div className={clsx("relative flex flex-col w-full", className)}>
      <div>
        <div className="relative container-input">
          <div
            className={clsx(
              {
                "!border-alert-error focus:border-alert-error !placeholder-alert-error focus:ring-transparent":
                  error || verifyValue === false,
              },
              {
                "!text-alert-error ": error,
              },
              { "border text-primary border-primary": isFill },
              { "bg-transparent border-primary": primary && !error },

              //Styles normal input
              {
                "bg-gray-opacity-10 outline-none ring-offset-transparent ring-opacity-0 border-gray-opacity-10 ring-transparent":
                  !isFill && !error,
              },
              "placeholder-primary-disabled py-1 w-full border",
              {
                "border-gray-500": !error && !isFill,
              },
              "disabled:placeholder-gray-200 disabled:cursor-not-allowed disabled:text-gray-500",
              "!bg-[#F4F4F4] border border-white rounded-full text-sm text-[#989898]",
              {
                "focus:outline-none focus:bg-gray-opacity-10 focus:ring-offset-transparent focus:ring-opacity-0 focus:border-white focus:ring-transparent":
                  !error,
              },
              classNameContainer,
            )}
          >
            <select
              onKeyUp={(e) => {
                if (props.type === "tel") {
                  e.currentTarget.value === ""
                    ? setShowLabel(false)
                    : setShowLabel(true);
                }
              }}
              id={name}
              name={name}
              autoComplete="off"
              className={clsx("w-full bg-transparent", {
                "focus:outline-none  focus:ring-offset-transparent focus:ring-opacity-0 focus:border-white focus:ring-transparent cursor-pointer":
                  !error,
              })}
              ref={registerAux && registerAux.ref}
              onChange={(e) => {
                registerAux && registerAux.onChange(e); // method from hook form register
                setOption(e.target.value);
                onChangeCustom && onChangeCustom(e); // your method
                e.target.value === ""
                  ? setShowLabel(false)
                  : setShowLabel(true);
              }}
              value={option}
              {...props}
            >
              <option value="">{placeholder}</option>
              {options?.map(({ value, title }: any, index: any) => (
                <option key={index} value={value}>
                  {title}
                </option>
              ))}
            </select>

            {error && error.message && (
              <span className="text-[12px] text-alert-error font-bold flex gap-1 items-center px-2 pt-1">
                <ExclamationCircleIcon className="w-4" /> {error.message}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
