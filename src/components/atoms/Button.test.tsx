import { expect, jest } from "@jest/globals";
import { fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "./Button";

describe("Button Interface", () => {
  it("Button", () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>Test Button</Button>);
    const button = getByText(/Test button/i);

    expect(button).toBeTruthy();

    // fireEvent.click(button);
    userEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
