import { useDispatch } from "react-redux";
import * as Yup from "yup";

import { MyField, MyForm } from "src/components/lib/formik";
import { AppDispatch } from "src/store";
import { action } from "src/store/toDoList";

function Form() {
  const dispatch = useDispatch<AppDispatch>();
  const initialValues = {
    content: "",
  };
  const validationSchema = Yup.object({
    content: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
  });
  const onSubmit = (values: object) => dispatch(action.postToDo(values as IPostToDoRequestPayload)).unwrap();

  return (
    <MyForm id="to-do-form" initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <MyField
        label="To Do: "
        id="to-do-field"
        name="content"
        type="text"
        placeholder="type to do..."
        maxLength={20}
        autoFocus
        canSubmitByEnterKey
      />
      <button type="submit">Add</button>
    </MyForm>
  );
}

export default Form;
