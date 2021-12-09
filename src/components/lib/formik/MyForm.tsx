import { Formik, Form } from "formik";
import { useCallback } from "react";

import StyledMyForm from "./MyForm.styled";

interface IProps {
  id?: string;
  className?: string;
  initialValues: object;
  validationSchema?: object;
  onSubmit: (values: object) => Promise<any>;
  children?: React.ReactNode; // ReactNode allows multiple elements, strings, numbers, fragments, portals, …
}

function MyForm({ id, className, initialValues, validationSchema, onSubmit, children }: IProps) {
  const onSubmitMiddleware = useCallback((values, actions) => {
    onSubmit(values)
      .then(() => {
        actions.resetForm({
          values: initialValues,
        });
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  }, []);

  return (
    <StyledMyForm id={id} className={className}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitMiddleware}>
        <Form>{children}</Form>
      </Formik>
    </StyledMyForm>
  );
}

export default MyForm;
