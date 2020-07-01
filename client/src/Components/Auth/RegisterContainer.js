import React, { Component } from "react";
import RegisterForm from "./RegisterForm";
import { connect } from "react-redux";
import { registerUser } from "../../Redux/Actions/AuthActions";
import { Form, Row } from "antd";

class RegisterContainer extends Component {
  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      !err ? this.props.registerUser(values) : {};
    });
  };
  render() {
    return (
      <Row>
        <RegisterForm
          error={this.props.auth.error}
          Register={this.props.auth.isRegister}
          Authenticated={this.props.auth.isAuthenticated}
          form={this.props.form}
          onSubmit={this.onSubmit}
        />
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
const mapDispatchToProps = dispatch => {
  return {
    registerUser: data => dispatch(registerUser(data))
  };
};
const RegisterContainerWrapped = Form.create({ name: "RegisterContainer" })(
  RegisterContainer
);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterContainerWrapped);
