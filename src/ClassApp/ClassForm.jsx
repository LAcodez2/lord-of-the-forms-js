import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: ["", "", "", ""],
    showErrors: false,
  };

  // Handle normal text inputs
  handleChange = (field, value) => {
    this.setState({ [field]: value });
  };

  // Handle phone inputs with auto-tab
  handlePhoneChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // only numbers allowed

    const updatedPhone = [...this.state.phone];
    updatedPhone[index] = value;
    this.setState({ phone: updatedPhone }, () => {
      const maxLength = index === 3 ? 1 : 2;
      if (value.length === maxLength && index < 3) {
        const nextInput = document.getElementById(`phone-input-${index + 2}`);
        if (nextInput) nextInput.focus();
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ showErrors: true });

    const { firstName, lastName, email, city, phone } = this.state;

    const isFirstNameValid = firstName.length >= 2;
    const isLastNameValid = lastName.length >= 2;
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isCityValid = city.length > 0;
    const isPhoneValid = phone.join("").length === 7;

    if (
      isFirstNameValid &&
      isLastNameValid &&
      isEmailValid &&
      isCityValid &&
      isPhoneValid
    ) {
      this.props.onSubmitSuccess({
        firstName,
        lastName,
        email,
        city,
        phone: phone.join(""),
      });
    }
  };

  render() {
    const { firstName, lastName, email, city, phone, showErrors } = this.state;

    const isFirstNameValid = firstName.length >= 2;
    const isLastNameValid = lastName.length >= 2;
    const isEmailValid = /\S+@\S+\.\S+/.test(email);
    const isCityValid = city.length > 0;
    const isPhoneValid = phone.join("").length === 7;

    return (
      <form onSubmit={this.handleSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* First Name */}
        <div className="input-wrap">
          <label>First Name:</label>
          <input
            placeholder="Bilbo"
            value={firstName}
            onChange={(e) => this.handleChange("firstName", e.target.value)}
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
            value={lastName}
            onChange={(e) => this.handleChange("lastName", e.target.value)}
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
            value={email}
            onChange={(e) => this.handleChange("email", e.target.value)}
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
            value={city}
            onChange={(e) => this.handleChange("city", e.target.value)}
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
            {phone.map((value, index) => (
              <input
                key={index}
                id={`phone-input-${index + 1}`}
                type="text"
                value={value}
                maxLength={index === 3 ? 1 : 2}
                onChange={(e) => this.handlePhoneChange(index, e.target.value)}
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
  }
}
