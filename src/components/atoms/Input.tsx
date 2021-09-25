import { useState, useRef } from "react";

type IProps = {
  type: string;
  className?: string;
  maxLength?: number;
  autoFocus?: boolean;
  defaultValue: string;
  defaultChecked?: boolean;
  onChange?: ({ newValue, newChecked }: InputChangeParameter) => void;
  onPressEnter?: () => void;
};

function Input({
  type,
  className,
  maxLength,
  autoFocus,
  defaultValue,
  defaultChecked,
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
      defaultChecked={defaultChecked}
      onChange={(event) => {
        const isTextInput = type === "text";
        const { value: newValue, checked: newChecked } = event.target;

        if (isTextInput) {
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
