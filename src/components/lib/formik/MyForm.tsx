import { Formik, Form } from "formik";
import { useCallback } from "react";

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
    <div id={id} className={className}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmitMiddleware}>
        <Form>{children}</Form>
      </Formik>
    </div>
  );
}

export default MyForm;
