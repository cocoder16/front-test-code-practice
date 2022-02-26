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

    // 현상:fireEvent, userEvent 아무것도 안먹힘
    // 원인: 컴포넌트가 내부에서 state로 값을 관리해야 변경된 값을 인지하여 통과가 가능. html태그 자체 스팩으로 변경된거는 이걸로 테스트가 안됨
    // => 즉 controlled component만 테스트할 수 있다. 이것은 리액트 공식문서 권고이기도 하다.
    // 이 input atom은 input html tag를 참조만하는 uncontrolled component이므로 테스트를 못하는 것이다.

    // fireEvent.change(input, { target: { value: appendedText } });
    userEvent.type(input, appendedText + "{enter}");

    expect(input).toHaveAttribute("value", expectedText);
    expect(input).not.toHaveAttribute("value", fullText);
    expect(props.onChange).toBeCalledTimes(expectedChangeCount);
    expect(props.onChange).toBeCalledWith({
      newValue: expectedText,
      newChecked: false,
    });
    expect(props.onPressEnter).toBeCalledTimes(expectedCallCountOfEnter);
  });
});
