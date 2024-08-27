import clsx from "clsx";
import Link from "next/link";
import * as React from "react";
// import { Spinner } from "../spinner/spinner";

export interface ButtonProps {
  size?: "extra-small" | "small" | "medium" | "large" | "full";
  label?: string;
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
  fill?: boolean;
  labelProps?: string;
  href?: string;
  decoration?:
    | "primary"
    | "primary-outlined"
    | "secondary"
    | "secondary-line"
    | "white"
    | "light"
    | "line-white"
    | "fillPrimaryDisabled"
    | "transparent";
  icon?: any;
  className?: string;
  withBorder?: boolean;
  boderRadius?: string;
  type?: string;
  tag?: boolean;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  size = "medium",
  label,
  disabled,
  onClick,
  decoration,
  icon,
  withBorder = true,
  className,
  loading,
  labelProps,
  children,
  type,
  ...props
}) => {
  return (
    <>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={clsx(
          // with border
          { "border-none": !withBorder },
          //size
          { "w-full": size === "full" },
          { "bg-primary text-white": decoration == "primary" },
          { "border-2 border-white text-white": decoration == "line-white" },
          {
            "border-2 border-primary bg-transparent text-primary":
              decoration == "primary-outlined",
          },
          {
            "bg-white !text-secondary border-2 border-secondary":
              decoration == "secondary-line",
          },
          {
            "bg-secondary !text-white border-2 border-secondary":
              decoration == "secondary",
          },
          {
            "lg:!py-3 lg:!px-6 !py-2 !px-4": size == "small",
          },
          {
            "!py-2 !px-2": size == "extra-small",
          },
          {
            "lg:!py-5 lg:!px-10 !py-3 !px-6": size === "medium",
          },
          { "bg-light-blue !text-white": decoration == "light" },
          {
            "bg-transparent !text-white font-bold border-2 border-[#00114B]":
              decoration == "transparent",
          },
          { "bg-white !text-primary": decoration == "white" },
          { "opacity-50": disabled },
          {
            "!border-none !bg-[#ffffff2c] hover:!opacity-100 !opacity-90":
              decoration === "fillPrimaryDisabled",
          },
          "rounded-lg px-4 py-2 whitespace-nowrap text-sm font-[400]",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    </>
  );
};

export const ButtonContent: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  size,
  label,
  disabled,
  onClick,
  href,
  decoration = "primary",
  icon,
  children,
  className,
  type,
  ...props
}) => {
  return (
    <>
      {href ? (
        <Link href={href}>
          <Button
            size={size}
            label={label}
            disabled={disabled}
            href={href}
            decoration={decoration}
            className={className}
            type={type}
            {...props}
          >
            {children}
          </Button>
        </Link>
      ) : (
        <Button
          size={size}
          label={label}
          disabled={disabled}
          onClick={onClick}
          href={href}
          decoration={decoration}
          type={type}
          className={className}
          {...props}
        >
          {children}
        </Button>
      )}
    </>
  );
};
