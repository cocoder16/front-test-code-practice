import { mount } from "@cypress/react";

import Input from "src/components/atoms/Input";

describe("Input Interface", () => {
  it("text type Input props", () => {
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
});
