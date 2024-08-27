"use client";
import * as React from "react";
import clsx from "clsx";
import styles from "./input.module.scss";
import { XIcon } from "@heroicons/react/solid";
import { ExclamationCircleIcon } from "@heroicons/react/outline";

export const Input: React.FC<
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
  customPlaceholder,
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
  ...props
}) => {
  //@typescript-eslint/no-unused-vars

  React.useEffect(() => {}, []);

  const [showLabel, setShowLabel] = React.useState(false);
  const registerAux = register(name, rules);
  return (
    <div className={clsx("relative flex flex-col w-full", className)}>
      <div className={clsx(styles.input)}>
        <div className="flex flex-1">
          {labelVisible && (
            <div className="flex-auto">
              <p
                className={clsx(
                  { "text-alert-error": error || verifyValue === false },
                  "mb-2 block text-sm font-[450] text-overlay-border",
                )}
              >
                {(showLabel || labelVisible) && title}
              </p>
            </div>
          )}

          {verifyValue === false && (
            <div className="flex-1 text-right">
              <p
                className={clsx(
                  "ml-3 font-bold mb-2 block f-18 text-gray-500 cursor-pointer",
                )}
                onClick={handleVerification}
              >
                <p>Verificar</p>
              </p>
            </div>
          )}
        </div>
        <div className="relative container-input">
          <input
            onKeyUp={(e) => {
              if (props.type === "tel") {
                e.currentTarget.value === ""
                  ? setShowLabel(false)
                  : setShowLabel(true);
              }
            }}
            id={name}
            name={name}
            placeholder={customPlaceholder || title}
            autoComplete="off"
            className={clsx(
              styles.text,
              {
                "!border-alert-error focus:border-alert-error !placeholder-alert-error focus:ring-transparent":
                  error || verifyValue === false,
              },
              {
                "!text-alert-error ": error,
              },
              { "pl-21 md:pl-36 pr-4": InputSelect },
              { "pl-14 pr-4": leftImg },
              { "pr-8 pl-4": rightImg },
              { "border text-primary border-primary": isFill },
              { "bg-transparent border-primary": primary && !error },

              //Styles normal input
              {
                "bg-gray-opacity-10 outline-none ring-offset-transparent ring-opacity-0 border-gray-opacity-10 ring-transparent":
                  !isFill && !error,
              },
              !!isFill && styles.inputDateWithValue,
              "py-2 !bg-[#F4F4F4] w-full font-montserrat border",
              {
                "border-gray-500": !error && !isFill,
              },
              "disabled:placeholder-gray-600 placeholder-[#989898] disabled:cursor-not-allowed disabled:text-gray-700",
              "text-[#989898] border border-white font-[400] text-[14px]",
              classNameContainer,
            )}
            ref={registerAux && registerAux.ref}
            onChange={(e) => {
              registerAux && registerAux.onChange(e); // method from hook form register
              onChangeCustom && onChangeCustom(e); // your method
              e.target.value === "" ? setShowLabel(false) : setShowLabel(true);
            }}
            // ref={register ? register(rules) : () => ({})}
            {...props}
          />
          {InputSelect && (
            <div className="absolute top-0 h-full w-20 md:w-32">
              <InputSelect />
            </div>
          )}
          {rightImg && (
            <div
              onClick={rightClick}
              className={clsx(
                { "cursor-pointer": rightClick },
                "absolute right-2 top-0 bottom-0 my-auto w-auto text-xl flex items-center text-overlay-border",
              )}
            >
              {rightImg}
            </div>
          )}

          {error && error.message && (
            <span className="text-[12px] text-alert-error font-bold flex gap-1 items-center px-2 pt-1">
              <ExclamationCircleIcon /> {error.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
