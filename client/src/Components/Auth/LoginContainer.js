import React, { Component } from "react";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { login } from "../../Redux/Actions/AuthActions";
import { Form, Row } from "antd";

class LoginContainer extends Component {
  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      !err ? this.props.loginUser(value) : {};
    });
  };

  render() {
    return (
      <Row gutter={1}>
        <LoginForm
          error={this.props.auth.error}
          isAuthenticated={this.props.auth.isAuthenticated}
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
    loginUser: data => dispatch(login(data))
  };
};

const LoginContainerWrapped = Form.create({ name: "LoginContainer" })(
  LoginContainer
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainerWrapped);
