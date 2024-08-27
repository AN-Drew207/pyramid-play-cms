import * as React from "react";
import clsx from "clsx";

import { Input } from "./input";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

export const InputPassword: React.FC<
  any & React.InputHTMLAttributes<HTMLInputElement>
> = ({ ...props }) => {
  //@typescript-eslint/no-unused-vars
  const [show, setShow] = React.useState(false);
  return (
    <Input
      {...props}
      type={!show ? "password" : "text"}
      rightClick={() => setShow((prev) => !prev)}
      rightImg={
        !show ? (
          <EyeIcon className="w-8 pr-2" />
        ) : (
          <EyeOffIcon className="w-8 pr-2" />
        )
      }
    />
  );
};
