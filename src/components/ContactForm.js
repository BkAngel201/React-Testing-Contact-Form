import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios"

const ContactForm = () => {
  const [data, setData] = useState();
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => {
    axios.post('https://reqres.in/api/users',data)
    .then(res => setData(res.data))
    

  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)} data-testid="form">
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            name="firstName"
            data-testid = "first-name"
            placeholder="Edd"
            ref={register({ required: true, maxLength: 10 })}
          />
          {errors.firstName && (
            <p>Looks like there was an error: {errors.firstName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
            name="lastName"
            data-testid = "last-name"
            placeholder="Burke"
            ref={register({ required: true })}
          />
          {errors.lastName && (
            <p>Looks like there was an error: {errors.lastName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" placeholder="bluebill1049@hotmail.com">
            Email*
          </label>
          <input data-testid="email" name="email" ref={register({ required: true })} />
          {errors.email && (
            <p>Looks like there was an error: {errors.email.type}</p>
          )}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea data-testid="message" name="message" ref={register({ required: false })} />
        </div>
        {data && (
          <pre data-testid="json-response-print" style={{ textAlign: "left", color: "white" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
        <input data-testid="submit-button" type="submit" />
      </form>
    </div>
  );
};

export default ContactForm;
