import React from "react";
import { render, act, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import ContactForm from './components/ContactForm'

test("renders App without crashing", () => {
  render(<App />);
});

test("fields are required", async () => {
  const { getByTestId } = render(<ContactForm/>)
  const submitButton = getByTestId("submit-button")
  await act(async () => {
      fireEvent.submit(submitButton);
    });
  const paragraph = document.querySelectorAll('p')
  expect(paragraph.length).toEqual(3)

})

test('Test form fields change values: first-name', () => {
  const { getByTestId } = render(<ContactForm/>)
 
  const firstName = getByTestId("first-name")
  fireEvent.change(firstName, {
    target: {value: "Angel"}
  })
  expect(firstName).toHaveValue("Angel")
})

test('Test form fields change values: last-name', () => {  
  const { getByTestId } = render(<ContactForm/>)
  const lastName = getByTestId("last-name")
  fireEvent.change(lastName, {
    target: {value: "Couso"}
  })
  expect(lastName).toHaveValue("Couso")
})

test('Test form fields change values: email', () => {
  const { getByTestId } = render(<ContactForm/>)
  const email = getByTestId("email")
  fireEvent.change(email, {
    target: {value: "angel@lambaschool.com"}
  })
  expect(email).toHaveValue("angel@lambaschool.com")
})

test('Test form fields change values: message', () => {
  const { getByTestId } = render(<ContactForm/>)
  const message = getByTestId("message")
  fireEvent.change(message, {
    target: {value: "Hello Word"}
  })
  expect(message).toHaveValue("Hello Word")

})

test("first-name max length message displayed correctly", async () => {
  const { getByTestId } = render(<ContactForm/>)
  const submitButton = getByTestId("submit-button")
  
  const firstName = getByTestId("first-name")
  fireEvent.change(firstName, {
    target: {value: "AngelManuelBryan"}
  })
  await act(async () => {
    fireEvent.submit(submitButton);
  });
  const paragraph = document.querySelectorAll('p')
  expect(paragraph[0].textContent).toMatch(/Looks like there was an error: maxLength/i)
})

// test ('POST response from API on submit', async () => {
//   const { getByTestId, getByRole } = render(<ContactForm/>)
//   const form = getByTestId("form")

//   const firstName = getByTestId("first-name")
//   fireEvent.change(firstName, {
//     target: {value: "Angel"}
//   })

//   const lastName = getByTestId("last-name")
//   fireEvent.change(lastName, {
//     target: {value: "Couso"}
//   })

//   const email = getByTestId("email")
//   fireEvent.change(email, {
//     target: {value: "angel@lambaschool.com"}
//   })

//   const message = getByTestId("message")
//   fireEvent.change(message, {
//     target: {value: "Hello Word"}
//   })

//   await act(async() => {
//     fireEvent.submit(form)
//   })
//   getByRole('json-response-print')
// })

