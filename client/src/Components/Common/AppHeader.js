import React, {Component} from "react";
import {NavLink, withRouter} from "react-router-dom";
import {Menu, Icon} from "antd";

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false
    }
  }

  componentDidMount() {
    const token = localStorage.getItem("userLogin");
    if (token) {
      this.setState({login: true})
    } else {
      this.setState({login: false})
    }
  }

  render() {
    return (
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["/"]}
        selectedKeys={[location.pathname]}
        style={{lineHeight: "64px"}}
      >
        <Menu.Item>
          <span>Company Data App</span>
        </Menu.Item>
        <Menu.Item key="/home">
          <NavLink to="/home">
            <Icon type="home"/>
            <span>Home</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/create-company">
          <NavLink to="/create-company">
            <Icon type="setting"/>
            <span>Create company</span>
          </NavLink>
        </Menu.Item>

        {!this.state.login ?
          <Menu.Item key="/" style={{float: "right"}}>
            <NavLink to="/">
              <Icon type="login"/>
              <span>Login</span>
            </NavLink>
          </Menu.Item>
          :
          <Menu.Item key="/" onClick={() => {
            this.setState({login: false});
            this.props.logout()
          }} style={{float: "right"}}>

            <Icon type="logout"/>
            <span>Logout</span>

          </Menu.Item>
        }

        {!this.state.login &&
        <Menu.Item key="/register" style={{float: "right"}}>
          <NavLink to="/register">
            <Icon type="plus-circle"/>
            <span>Register</span>
          </NavLink>
        </Menu.Item>
        }
      </Menu>
    );
  }
}

export default withRouter(AppHeader);
