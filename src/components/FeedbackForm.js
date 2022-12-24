import { Component } from "react";
import FormErrors from "./FormErrors";

export default class FeedbackForm extends Component {
  state = {
    data: {
      fullName: "",
      email: "",
      mobile: "",
      message: ""
    },
    errors: {
      fullName: "",
      email: "",
      mobile: "",
      message: ""
    },
    validators: {
      fullNameIsValid: false,
      emailIsValid: false,
      mobileIsValid: false,
      messageIsValid: false,
      formValid: false
    },
    sent: false
  };
  changeHandle = ({ target: { name, value } }) => {
    this.setState({ data: { ...this.state.data, [name]: value } }, () => {
      this.validateField(name, value);
    });
  };
  validateField(fieldName, value) {
    let { errors, validators } = this.state;

    switch (fieldName) {
      case "fullName":
        validators.fullNameIsValid = value.match(/^[a-zA-Z]{3,40}$/);
        errors.fullName = validators.fullNameIsValid
          ? ""
          : "Full name is invalid";
        break;
      case "email":
        validators.emailIsValid = value.match(
          /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
        );
        errors.email = validators.emailIsValid ? "" : "E-mail is invalid";
        break;
      case "mobile":
        validators.mobileIsValid = value.match(/^(\+\d{1,3}[- ]?)?\d{10}$/);
        errors.mobile = validators.mobileIsValid
          ? ""
          : "Mobile number is invalid";
        break;
      case "message":
        validators.messageIsValid = value.match(/^[a-zA-Z]{20,200}$/);
        errors.message = validators.messageIsValid
          ? ""
          : "The message must be at least 20 characters long (max:200)";
        break;
      default:
        break;
    }
    this.setState(
      {
        errors: errors,
        validators: validators
      },
      this.validateForm
    );
  }
  validateForm() {
    const {
      fullNameIsValid,
      emailIsValid,
      mobileIsValid,
      messageIsValid
    } = this.state.validators;
    let isvalid =
      fullNameIsValid && emailIsValid && mobileIsValid && messageIsValid;
    this.setState({
      validators: { ...this.state.validators, formValid: isvalid }
    });
  }
  formSubmit = (e) => {
    e.preventDefault();
    this.setState({ sent: true });
    this.setState({
      data: {
        fullName: "",
        email: "",
        mobile: "",
        message: ""
      },
      errors: {
        fullName: "",
        email: "",
        mobile: "",
        message: ""
      }
    });
  };
  render() {
    const {
      data: { fullName, email, mobile, message },
      errors,
      sent
    } = this.state;
    return (
      <>
        <div className="main-block">
          <div className="left-part">
            <i className="fas fa-envelope"></i>
            <i className="fas fa-at"></i>
            <i className="fas fa-mail-bulk"></i>
          </div>
          <form onSubmit={this.formSubmit}>
            <h1>Contact Us</h1>
            {sent ? (
              <div className="success-message">
                <p>Succesfully sent.</p>
              </div>
            ) : null}
            <FormErrors errors={errors} />
            <div className="info">
              <input
                type="text"
                name="fullName"
                value={fullName}
                onChange={this.changeHandle}
                placeholder="Full name"
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.changeHandle}
                placeholder="Email"
              />
              <input
                type="text"
                name="mobile"
                value={mobile}
                onChange={this.changeHandle}
                placeholder="Phone number"
              />
            </div>
            <p>Message</p>
            <div>
              <textarea
                rows="4"
                name="message"
                value={message}
                onChange={this.changeHandle}
              ></textarea>
            </div>
            <button type="submit" disabled={!this.state.validators.formValid}>
              Submit
            </button>
          </form>
        </div>
      </>
    );
  }
}
