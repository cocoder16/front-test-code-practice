import { useState, useRef } from "react";

type IProps = {
  type: string;
  className?: string;
  maxLength?: number;
  autoFocus?: boolean;
  defaultValue: string;
  onChange?: (value: string) => void;
  onPressEnter?: () => void;
};

function Input({
  type,
  className,
  maxLength,
  autoFocus,
  defaultValue,
  onChange,
  onPressEnter,
}: IProps) {
  const [value, setValue] = useState<string>(defaultValue);
  const isEnterKeyPressing = useRef<boolean>(false);

  return (
    <input
      type={type}
      className={className}
      maxLength={maxLength}
      autoFocus={autoFocus}
      value={value}
      onChange={(event) => {
        const newValue = event.target.value;
        setValue(newValue);
        onChange && onChange(newValue);
      }}
      onKeyPress={(event) => {
        if (onPressEnter) {
          const isEnterKey = event.code === "Enter";
          if (isEnterKey && !isEnterKeyPressing.current) {
            event.preventDefault();
            isEnterKeyPressing.current = true;
            onPressEnter();
          }
        }
      }}
      onKeyUp={(event) => {
        if (onPressEnter) {
          const isEnterKey = event.code === "Enter";
          if (isEnterKey && isEnterKeyPressing.current) {
            event.preventDefault();
            isEnterKeyPressing.current = false;
          }
        }
      }}
    />
  );
}

export default Input;
