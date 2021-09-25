import { mount } from "@cypress/react";

import Input from "src/components/atoms/Input";

describe("Input Interface", () => {
  it("text type Input", () => {
    const props = {
      type: "text",
      maxLength: 5,
      autoFocus: true,
      defaultValue: "abc",
      onChange: cy.stub().as("changeHandler"),
      onPressEnter: cy.stub().as("pressEnterHandler"),
    };
    const appendedText = "defg";
    const fullText = props.defaultValue + appendedText;
    const expectedText = (props.defaultValue + appendedText).slice(
      0,
      props.maxLength
    );
    const expectedChangeCount = expectedText.length - props.defaultValue.length;
    const expectedCallCountOfEnter = 1;

    mount(
      <Input
        type={props.type}
        maxLength={props.maxLength}
        autoFocus={props.autoFocus}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        onPressEnter={props.onPressEnter}
      />
    );

    cy.get("input").should("be.focused").and("have.value", props.defaultValue);
    cy.get("input")
      .type(appendedText)
      .type("{enter}")
      .should("have.value", expectedText)
      .and("not.have.value", fullText);
    cy.get("@changeHandler").should("have.callCount", expectedChangeCount);
    cy.get("@pressEnterHandler").should(
      "have.callCount",
      expectedCallCountOfEnter
    );
  });

  it("radio type Input", () => {
    const props = {
      type: "radio",
      name: "select",
      defaultValue: "abc",
      defaultChecked: false,
      onChange: cy.stub().as("changeHandler"),
    };

    mount(
      <Input
        type={props.type}
        name={props.name}
        defaultValue={props.defaultValue}
        defaultChecked={props.defaultChecked}
        onChange={props.onChange}
      />
    );

    cy.get("input")
      .should("have.value", props.defaultValue)
      .and("not.be.checked");
    cy.get("input").check().should("be.checked");
    cy.get("@changeHandler").should("have.callCount", 1);
    cy.get("input").click().should("be.checked");
    cy.get("@changeHandler").should("have.callCount", 1);
  });

  it("checkbox type Input", () => {
    const props = {
      type: "checkbox",
      name: "select",
      defaultValue: "abc",
      defaultChecked: false,
      onChange: cy.stub().as("changeHandler"),
    };

    mount(
      <Input
        type={props.type}
        name={props.name}
        defaultValue={props.defaultValue}
        defaultChecked={props.defaultChecked}
        onChange={props.onChange}
      />
    );

    cy.get("input")
      .should("have.value", props.defaultValue)
      .and("not.be.checked");
    cy.get("input").check().should("be.checked");
    cy.get("@changeHandler").should("have.callCount", 1);
    cy.get("input").click().should("not.be.checked");
    cy.get("@changeHandler").should("have.callCount", 2);
  });

  it("number type Input", () => {
    const props = {
      type: "number",
      maxLength: 5,
      autoFocus: true,
      defaultValue: "",
      onChange: cy.stub().as("changeHandler"),
      onPressEnter: cy.stub().as("pressEnterHandler"),
    };
    const appendedNumber = "123456";
    const expectedNumber = appendedNumber.slice(0, props.maxLength);
    const expectedChangeCount =
      expectedNumber.length - props.defaultValue.length;
    const expectedCallCountOfEnter = 1;

    mount(
      <Input
        type={props.type}
        maxLength={props.maxLength}
        autoFocus={props.autoFocus}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        onPressEnter={props.onPressEnter}
      />
    );

    cy.get("input").should("be.focused").and("have.value", props.defaultValue);
    cy.get("input")
      .type(appendedNumber)
      .type("{enter}")
      .should("have.value", expectedNumber)
      .and("not.have.value", appendedNumber);
    cy.get("@changeHandler").should("have.callCount", expectedChangeCount);
    cy.get("@pressEnterHandler").should(
      "have.callCount",
      expectedCallCountOfEnter
    );
  });
});
