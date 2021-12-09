import { Field, useField, useFormikContext } from "formik";

interface IMyField {
  label?: string;
  id?: string;
  name: string;
  type: string;
  placeholder?: string;
  maxLength?: number;
  autoFocus?: boolean;
  canSubmitByEnterKey?: boolean;
  children?: React.ReactNode;
}

function MyField({
  label,
  id,
  name,
  type,
  placeholder,
  maxLength,
  autoFocus,
  canSubmitByEnterKey,
  children,
}: IMyField) {
  const [field, meta] = useField({ name, type });
  const { isSubmitting } = useFormikContext();

  return (
    <div className="my-field">
      <label htmlFor={id}>{label}</label>
      <Field
        id={id}
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        autoFocus={autoFocus}
        disabled={isSubmitting}
        onKeyPress={(event: any) => {
          const isEnterKey = event.code === "Enter";

          if (isEnterKey && !canSubmitByEnterKey) {
            event.preventDefault();
          }
        }}
        {...field}
      />
      {children}
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
}

export default MyField;
