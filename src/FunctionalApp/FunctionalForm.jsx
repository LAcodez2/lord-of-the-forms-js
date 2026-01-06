import { useState, useEffect } from "react";
import { ErrorMessage } from "../ErrorMessage";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({ onSubmitSuccess }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: ["", "", "", ""],
  });

  const [showErrors, setShowErrors] = useState(false);

  // Focus first phone input on mount
  useEffect(() => {
    document.getElementById("phone-input-1")?.focus();
  }, []);

  // Validation flags
  const isFirstNameValid = form.firstName.length >= 2;
  const isLastNameValid = form.lastName.length >= 2;
  const isEmailValid = /\S+@\S+\.\S+/.test(form.email);
  const isCityValid = form.city.length > 0;
  const isPhoneValid = form.phone.join("").length === 7;

  // Handle phone input changes with auto-tab
  const handlePhoneChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only numbers

    const updatedPhone = [...form.phone];
    updatedPhone[index] = value;
    setForm({ ...form, phone: updatedPhone });

    // Auto-tab to next input if current filled
    const maxLength = index === 3 ? 1 : 2;
    if (value.length === maxLength && index < 3) {
      const nextInput = document.getElementById(`phone-input-${index + 2}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowErrors(true);

    if (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isCityValid &&
      isPhoneValid
    ) {
      onSubmitSuccess(form);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* First Name */}
      <div className="input-wrap">
        <label>First Name:</label>
        <input
          placeholder="Bilbo"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
      </div>
      <ErrorMessage
        message={firstNameErrorMessage}
        show={showErrors && !isFirstNameValid}
      />

      {/* Last Name */}
      <div className="input-wrap">
        <label>Last Name:</label>
        <input
          placeholder="Baggins"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
      </div>
      <ErrorMessage
        message={lastNameErrorMessage}
        show={showErrors && !isLastNameValid}
      />

      {/* Email */}
      <div className="input-wrap">
        <label>Email:</label>
        <input
          placeholder="bilbo-baggins@adventurehobbits.net"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <ErrorMessage
        message={emailErrorMessage}
        show={showErrors && !isEmailValid}
      />

      {/* City */}
      <div className="input-wrap">
        <label>City:</label>
        <input
          placeholder="Hobbiton"
          list="cities"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
      </div>
      <ErrorMessage
        message={cityErrorMessage}
        show={showErrors && !isCityValid}
      />

      {/* Phone */}
      <div className="input-wrap">
        <label>Phone:</label>
        <div id="phone-input-wrap">
          {form.phone.map((value, index) => (
            <input
              key={index}
              id={`phone-input-${index + 1}`}
              type="text"
              value={value}
              maxLength={index === 3 ? 1 : 2} // last input single digit
              onChange={(e) => handlePhoneChange(index, e.target.value)}
            />
          ))}
        </div>
      </div>
      <ErrorMessage
        message={phoneNumberErrorMessage}
        show={showErrors && !isPhoneValid}
      />

      <input type="submit" value="Submit" />
    </form>
  );
};
