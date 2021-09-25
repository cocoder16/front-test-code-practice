import { useState, useRef } from "react";

type IProps = {
  type: string;
  name?: string;
  className?: string;
  maxLength?: number;
  autoFocus?: boolean;
  defaultValue: string | number;
  defaultChecked?: boolean;
  onChange?: ({ newValue, newChecked }: InputChangeParameter) => void;
  onPressEnter?: () => void;
};

function Input({
  type,
  name,
  className,
  maxLength,
  autoFocus,
  defaultValue,
  defaultChecked,
  onChange,
  onPressEnter,
}: IProps) {
  const [value, setValue] = useState<string | number>(defaultValue);
  const isEnterKeyPressing = useRef<boolean>(false);

  return (
    <input
      type={type}
      name={name}
      className={className}
      maxLength={maxLength}
      autoFocus={autoFocus}
      value={value}
      defaultChecked={defaultChecked}
      onChange={(event) => {
        const shouldSetValue = type === "text" || type === "number";
        const { value: newValue, checked: newChecked } = event.target;

        if (shouldSetValue) {
          setValue(newValue);
        }
        onChange && onChange({ newValue, newChecked });
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
