import { Component } from "react";

export default class FormErrors extends Component {
  render() {
    const { errors } = this.props;
    return (
      <div className="form-errors">
        {Object.keys(errors).map((fieldName, i) => {
          if (errors[fieldName].length > 0) {
            return <p key={i}>{errors[fieldName]}</p>;
          } else {
            return "";
          }
        })}
      </div>
    );
  }
}