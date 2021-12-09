import { useRef } from "react";

interface IProps {
  type: string;
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  maxLength?: number;
  autoFocus?: boolean;
  defaultValue?: string | number;
  defaultChecked?: boolean;
  onChange?: ({ newValue, newChecked }: InputChangeParameter) => void;
  onPressEnter?: () => void;
}

function Input({
  type,
  id,
  name,
  className,
  placeholder,
  maxLength,
  autoFocus,
  defaultValue = "",
  defaultChecked,
  onChange,
  onPressEnter,
}: IProps) {
  const isEnterKeyPressing = useRef<boolean>(false);
  const fixedDefaultValue = type === "color" ? "#000000" : defaultValue;

  return (
    <input
      type={type}
      id={id}
      name={name}
      className={className}
      placeholder={placeholder}
      maxLength={maxLength}
      autoFocus={autoFocus}
      defaultValue={fixedDefaultValue}
      defaultChecked={defaultChecked}
      onChange={event => {
        const { value: newValue, checked: newChecked } = event.target;

        if (onChange) {
          onChange({ newValue, newChecked });
        }
      }}
      onKeyPress={event => {
        if (onPressEnter) {
          const isEnterKey = event.code === "Enter";

          if (isEnterKey && !isEnterKeyPressing.current) {
            event.preventDefault();
            isEnterKeyPressing.current = true;
            onPressEnter();
          }
        }
      }}
      onKeyUp={event => {
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
