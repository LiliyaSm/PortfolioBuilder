import {
  render,
  screen,
  getByTestId,
  within,
  fireEvent,
} from "@testing-library/react";
import ProjectDates, { CHECKBOX_LABEL } from "../ProjectDates";
import React from "react";

const project = {
  id: 123,
  isDraft: true,
  portfolioId: 1,
};

const defaultProps = {
  project,
  validationErrors: {},
};

const setupRender = (props = defaultProps) => {
  const container = render(<ProjectDates {...props} />);
  return container;
};

describe("ProjectDates", () => {
  it("end date input should be disabled if the checkbox 'till now' is selected", () => {
    setupRender();
    const checkbox = screen.getByLabelText(CHECKBOX_LABEL) as HTMLInputElement;
    const endDate = screen.getAllByRole("textbox")[1];
    expect(checkbox).toBeChecked();
    expect(endDate).toBeDisabled();
    fireEvent.click(checkbox);
    expect(endDate).toBeEnabled();
  });
});
