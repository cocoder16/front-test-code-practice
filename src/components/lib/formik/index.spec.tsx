import { mount } from "@cypress/react";
import * as Yup from "yup";

import { MyField, MyForm } from "./";

describe("MyForm", () => {
  const initialValues = {
    toDo: "",
    checked: true,
  };
  const myFieldProps = {
    label: "id: ",
    id: "to-do-field",
    name: "toDo",
    type: "text",
    placeholder: "type...",
    maxLength: 20,
    autoFocus: false,
    canSubmitByEnterKey: true,
  };
  const myCheckFieldProps = {
    label: "check: ",
    id: "check-field",
    name: "checked",
    type: "checkbox",
  };
  function MyFormTestComponent({
    myFieldProps,
    myCheckFieldProps,
    id,
    initialValues,
    validationSchema,
    onSubmit,
    haveSubmitButton,
  }: any) {
    return (
      <MyForm id={id} initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <MyField {...myFieldProps} />
        <MyField {...myCheckFieldProps} />
        {haveSubmitButton && <button type="submit">submit</button>}
      </MyForm>
    );
  }
  beforeEach(() => {});

  it("Given MyForm possible enter-submit with default checked, Then rendering, When typing and enter, Then submit", () => {
    const validationSchema = Yup.object({
      toDo: Yup.string().max(20, "Must be 20 characters or less").required("Required"),
      checked: Yup.boolean().required("Required").oneOf([true], "You must accept the terms and conditions."),
    });
    const onSubmit = cy.stub().as("submitHandler").resolvesThis(); // resolvesThis() 는 promise resolve를 반환하여 chainning을 시켜줌
    const typedValue = "study cypress";
    mount(
      // mount 안에서 컴포넌트 중첩구조를 선언하면 라이프사이클 문제(?, 추측임 제대로 파고들진 않았음)로 인해 테스트가 중첩 실행됨.
      // 그래서 하나의 컴포넌트로 미리 it 전에 선언해놓고 테스트함.
      <MyFormTestComponent
        myFieldProps={myFieldProps}
        myCheckFieldProps={myCheckFieldProps}
        id="my-form"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      />,
    );

    // typing and enter
    cy.get("#my-form").should("have.css", "border", "1px solid rgb(0, 0, 0)");
    cy.get("#to-do-field").should("have.attr", "placeholder", myFieldProps.placeholder).as("toDoField");
    cy.get("@toDoField").type(typedValue).should("have.value", typedValue);
    cy.get("@toDoField").type("{enter}");
    // submit
    cy.get("@submitHandler")
      .should("have.callCount", 1)
      .and("have.been.calledWith", { toDo: typedValue, checked: true });
    cy.get("@toDoField").should("have.value", "");
  });

  it("When type invaild text and submit, Then not submit and show error message", () => {
    const validationSchema = Yup.object({
      toDo: Yup.string()
        .min(10, "Must be 10 characters or more")
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      checked: Yup.boolean().required("Required").oneOf([true], "You must accept the terms and conditions."),
    });
    const onSubmit = cy.stub().as("submitHandler");
    const typedValue = "study";
    mount(
      <MyFormTestComponent
        myFieldProps={myFieldProps}
        myCheckFieldProps={myCheckFieldProps}
        id="my-form"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      />,
    );

    // typing and enter
    cy.get("#to-do-field").type(typedValue).type("{enter}");
    // submit
    cy.get("@submitHandler").should("have.callCount", 0);
    cy.get(".my-field .error").should("have.text", "Must be 10 characters or more");
  });

  it("Given not possible enter-submit, Then not fire submit and not show error message", () => {
    const validationSchema = Yup.object({
      toDo: Yup.string()
        .min(10, "Must be 10 characters or more")
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      checked: Yup.boolean().required("Required").oneOf([true], "You must accept the terms and conditions."),
    });
    const onSubmit = cy.stub().as("submitHandler");
    mount(
      <MyFormTestComponent
        myFieldProps={{ ...myFieldProps, canSubmitByEnterKey: false }}
        myCheckFieldProps={myCheckFieldProps}
        id="my-form"
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      />,
    );

    cy.get("#to-do-field").type("{enter}");
    cy.get("@submitHandler").should("have.callCount", 0);
    cy.get(".my-field .error").should("have.length", 0);
  });

  it("Given not possible enter-submit and submit button, Then fire submit by button", () => {
    const validationSchema = Yup.object({
      toDo: Yup.string()
        .min(10, "Must be 10 characters or more")
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      checked: Yup.boolean().required("Required").oneOf([true], "You must accept the terms and conditions."),
    });
    const onSubmit = cy.stub().as("submitHandler").resolvesThis();
    const typedValue = "study cypress";
    mount(
      <MyFormTestComponent
        myFieldProps={{ ...myFieldProps, canSubmitByEnterKey: false }}
        myCheckFieldProps={myCheckFieldProps}
        id="my-form"
        initialValues={{ ...initialValues, checked: false }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        haveSubmitButton={true}
      />,
    );

    // typing and submit
    cy.get("#to-do-field").type(typedValue);
    cy.get("button").as("submitButton").click();

    cy.get("@submitHandler").should("have.callCount", 0);
    cy.get(".my-field .error").should("have.length", 1).and("have.text", "You must accept the terms and conditions.");

    // check and submit
    cy.get("#check-field").click();

    cy.get(".my-field .error").should("have.length", 0);

    cy.get("@submitButton").click();
    cy.get("@submitHandler")
      .should("have.callCount", 1)
      .and("have.been.calledWith", { toDo: typedValue, checked: true });
  });
});
