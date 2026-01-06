import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";

export class ClassApp extends Component {
  state = {
    userData: null,
  };

  handleFormSubmit = (FormData) => {
    this.setState({ userData: FormData});
  };

  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation
          userData={this.state.userData}
        />
        <ClassForm onSubmitSuccess={this.handleFormSubmit}/>
      </>
    );
  }
}
