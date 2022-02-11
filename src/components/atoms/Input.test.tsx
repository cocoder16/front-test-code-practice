import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Input from "./Input";

describe("Input Interface", () => {
  it("text type Input", () => {
    const props = {
      type: "text",
      maxLength: 5,
      autoFocus: true,
      defaultValue: "abc",
      onChange: jest.fn(),
      onPressEnter: jest.fn(),
    };
    const appendedText = "defg";
    const fullText = props.defaultValue + appendedText;
    const expectedText = (props.defaultValue + appendedText).slice(0, props.maxLength);
    const expectedChangeCount = expectedText.length - props.defaultValue.length;
    const expectedCallCountOfEnter = 1;

    const { container } = render(<Input {...props} />);
    const input = container.querySelector("input") as HTMLElement;

    expect(input.focus).toBeTruthy();
    expect(input).toHaveAttribute("value", props.defaultValue);

    // fireEvent, userEvent 아무것도 안먹힘
    fireEvent.change(input, { target: { value: appendedText } });
    // userEvent.type(input, appendedText + "{enter}");

    expect(input).toHaveAttribute("value", expectedText);
    expect(input).not.toHaveAttribute("value", fullText);
    expect(props.onChange).toBeCalledTimes(expectedChangeCount);
    expect(props.onChange).toBeCalledWith({
      newValue: expectedText,
      newChecked: false,
    });
    expect(props.onPressEnter).toBeCalledTimes(expectedCallCountOfEnter);
  });
  // it("radio type Input", () => {
  //   const props = {
  //     type: "radio",
  //     name: "select",
  //     defaultValue: "abc",
  //     defaultChecked: false,
  //     onChange: cy.stub().as("changeHandler"),
  //   };
  //   mount(
  //     <Input
  //       type={props.type}
  //       name={props.name}
  //       defaultValue={props.defaultValue}
  //       defaultChecked={props.defaultChecked}
  //       onChange={props.onChange}
  //     />,
  //   );
  //   cy.get("input").should("have.value", props.defaultValue).and("not.be.checked");
  //   cy.get("input").check().should("be.checked");
  //   cy.get("@changeHandler").should("have.callCount", 1).and("have.been.calledWith", {
  //     newValue: props.defaultValue,
  //     newChecked: true,
  //   });
  //   cy.get("input").click().should("be.checked");
  //   cy.get("@changeHandler").should("have.callCount", 1).and("have.been.calledWith", {
  //     newValue: props.defaultValue,
  //     newChecked: true,
  //   });
  // });
  // it("checkbox type Input", () => {
  //   const props = {
  //     type: "checkbox",
  //     name: "select",
  //     defaultValue: "abc",
  //     defaultChecked: false,
  //     onChange: cy.stub().as("changeHandler"),
  //   };
  //   mount(
  //     <Input
  //       type={props.type}
  //       name={props.name}
  //       defaultValue={props.defaultValue}
  //       defaultChecked={props.defaultChecked}
  //       onChange={props.onChange}
  //     />,
  //   );
  //   cy.get("input").should("have.value", props.defaultValue).and("not.be.checked");
  //   cy.get("input").check().should("be.checked");
  //   cy.get("@changeHandler").should("have.callCount", 1).and("have.been.calledWith", {
  //     newValue: props.defaultValue,
  //     newChecked: true,
  //   });
  //   cy.get("input").click().should("not.be.checked");
  //   cy.get("@changeHandler").should("have.callCount", 2).and("have.been.calledWith", {
  //     newValue: props.defaultValue,
  //     newChecked: false,
  //   });
  // });
  // it("number type Input", () => {
  //   const props = {
  //     type: "number",
  //     maxLength: 5,
  //     autoFocus: true,
  //     defaultValue: "",
  //     onChange: cy.stub().as("changeHandler"),
  //     onPressEnter: cy.stub().as("pressEnterHandler"),
  //   };
  //   const appendedNumber = "123456";
  //   const expectedNumber = appendedNumber.slice(0, props.maxLength);
  //   const expectedChangeCount = expectedNumber.length - props.defaultValue.length;
  //   const expectedCallCountOfEnter = 1;
  //   mount(
  //     <Input
  //       type={props.type}
  //       maxLength={props.maxLength}
  //       autoFocus={props.autoFocus}
  //       defaultValue={props.defaultValue}
  //       onChange={props.onChange}
  //       onPressEnter={props.onPressEnter}
  //     />,
  //   );
  //   cy.get("input").should("be.focused").and("have.value", props.defaultValue);
  //   cy.get("input")
  //     .type(appendedNumber)
  //     .type("{enter}")
  //     .should("have.value", expectedNumber)
  //     .and("not.have.value", appendedNumber);
  //   cy.get("@changeHandler").should("have.callCount", expectedChangeCount).and("have.been.calledWith", {
  //     newValue: expectedNumber,
  //     newChecked: false,
  //   });
  //   cy.get("@pressEnterHandler").should("have.callCount", expectedCallCountOfEnter);
  // });
  // it("password type Input", () => {
  //   const props = {
  //     type: "password",
  //     maxLength: 10,
  //     onChange: cy.stub().as("changeHandler"),
  //     onPressEnter: cy.stub().as("pressEnterHandler"),
  //   };
  //   const password = "abcd1234!@#";
  //   const slicedPassword = password.slice(0, props.maxLength);
  //   const expectedCallCountOfEnter = 1;
  //   mount(
  //     <Input
  //       type={props.type}
  //       maxLength={props.maxLength}
  //       onChange={props.onChange}
  //       onPressEnter={props.onPressEnter}
  //     />,
  //   );
  //   cy.get("input").and("have.value", "");
  //   cy.get("input").type(password).type("{enter}").should("have.value", slicedPassword).and("not.have.value", password);
  //   cy.get("@changeHandler").should("have.callCount", slicedPassword.length).and("have.been.calledWith", {
  //     newValue: slicedPassword,
  //     newChecked: false,
  //   });
  //   cy.get("@pressEnterHandler").should("have.callCount", expectedCallCountOfEnter);
  // });
  // it("color type Input", () => {
  //   const props = {
  //     type: "color",
  //     // defaultValue, => if want, test this
  //   };
  //   const defaultColorInputValue = "#000000";
  //   mount(<Input type={props.type} />);
  //   cy.get("input").should("have.value", defaultColorInputValue);
  // });
});
