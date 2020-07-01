import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {Form, Input, Button, Icon, Row, Col, Radio} from "antd";

class RegisterForm extends Component {
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Row gutter={1} style={{marginTop: "20px"}}>
        <Col span={6} offset={6}>
          <Form onSubmit={this.props.onSubmit} style={{width: "300px"}}>
            <Form.Item>
              <span>Register</span>
            </Form.Item>
            <Form.Item>
              <span style={{color: "red"}}>{this.props.error}</span>
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("userName", {
                rules: [
                  {required: true, message: "Please input your username"}
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{color: "rgba(0,0,0,.25)"}}/>
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "This input is not valid email"
                  },
                  {
                    required: true,
                    message: "Please input your email"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="mail" style={{color: "rgba(0,0,0,.25)"}}/>
                  }
                  placeholder="Email"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    min: 7,
                    required: true,
                    message: "password must be greater than 7 characters"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("role", {
                rules: [
                  {
                    required: true,
                    message: "Select role"
                  }
                ]
              })(
                <Radio.Group >
                  <Radio value={'ADMIN'}>ADMIN</Radio>
                  <Radio value={'STAFF'}>STAFF</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" ghost>
                {this.props.Register ? (
                  <Redirect to="/"/>
                ) : this.props.Authenticated ? (
                  <Redirect to="/home"/>
                ) : (
                  <Redirect to="/register"/>
                )}
                Register
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Form.create({name: "RegisterForm"})(RegisterForm);
