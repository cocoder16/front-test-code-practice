import React from "react";

type IProps = {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode; // ReactNode allows multiple elements, strings, numbers, fragments, portals, …
};

function Button({ className, onClick, children }: IProps) {
  return (
    <button
      type="button"
      className={`${className} with-icon`}
      onClick={event => {
        event.preventDefault();

        if (onClick) {
          onClick();
        }
      }}
    >
      {children}
    </button>
  );
}

export default Button;
