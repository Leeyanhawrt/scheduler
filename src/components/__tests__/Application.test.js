import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getAllByTestId, getByAltText, getByTestId, getByPlaceholderText, queryByText, getAllByText } from "@testing-library/react";

import axios from "axios";

import Application from "components/Application";

describe("Application", () => {

  afterEach(cleanup)

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"))

    fireEvent.click(getByText("Tuesday"))

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  })

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"))

    const appointments = getAllByTestId(container, 'appointment')
    const appointment = appointments[0]

    fireEvent.click(getByAltText(appointment, 'Add'))

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    })

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))

    fireEvent.click(getByText(appointment, 'Save'))

    expect(getByText(appointment, "Saving...")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  })

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on Archie Cohen
    const appointments = getAllByTestId(container, "appointment")
    const appointment = appointments[1]

    fireEvent.click(getByAltText(appointment, "Edit"))

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Archie Cohen" }
    })

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))

    fireEvent.click(getByText(appointment, 'Save'))

    await waitForElement(() => getByAltText(appointment, "Edit"))

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  })

  it("Loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on Archie Cohen
    const appointments = getAllByTestId(container, "appointment")
    const appointment = appointments[1]

    fireEvent.click(getByAltText(appointment, "Delete"))
    expect(getByText(appointment, "Delete this appointment?")).toBeInTheDocument()

    fireEvent.click(getByText(appointment, "Confirm"))
    expect(getByText(appointment, "Removing...")).toBeInTheDocument()

    await waitForElement(() => getByAltText(appointment, "Add"))

    const days = getAllByTestId(container, "day")
    const day = days[0]

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument

    expect(queryByText(container, "Archie Cohen")).not.toBeInTheDocument

    // 4. Click the confirm button  // 3. Click the "Delete" button on the booked appointment.
    // 4. Check that the confirmation message is shown.
    // 5. Click the "Confirm" button on the confirmation.
    // 6. Check that the element with the text "Deleting" is displayed.
    // 7. Wait until the element with the "Add" button is displayed.
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    // 5. Check that interview no longer exists
    // 6. Check that spots remaining has increased by 1
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment")
    const appointment = appointments[0]

    fireEvent.click(getByAltText(appointment, "Add"))

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    })

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))

    fireEvent.click(getByText(appointment, 'Save'))

    await waitForElement(() => getByText(appointment, "Error could not save your appointment"))
    expect(getByText(appointment, "Error could not save your appointment")).toBeInTheDocument()
  })

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment")

    const appointment = appointments[1]

    fireEvent.click(getByAltText(appointment, "Delete"))

    fireEvent.click(getByText(appointment, "Confirm"))

    await waitForElement(() => getByText(appointment, "Error could not delete your appointment"))

    expect(getByText(appointment, "Error could not delete your appointment")).toBeInTheDocument()
  })
});