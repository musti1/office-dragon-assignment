import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {Layout} from "antd";
import loadable from "@loadable/component";
import ProtectedRoutes from "./Components/ProtectedRoute/ProtectedRoutes";

const AppHeader = loadable(() => import("./Components/Common/AppHeader"));
const LoginContainer = loadable(() => import("./Components/Auth/LoginContainer"));
const RegisterContainer = loadable(() =>
  import("./Components/Auth/RegisterContainer")
);
const CompanyList = loadable(() => import("./Components/Company/CompanyList"));
const CreateCompanyContainer = loadable(() =>
  import("./Components/Company/CreateCompanyContainer")
);
const AppFooter = loadable(() => import("./Components/Common/AppFooter"));
import {Provider} from "react-redux";
import store from "./Redux/Store/Store";
import {loginSuccess, logoutUser} from "./Redux/Actions/AuthActions";

const {Header, Footer, Content} = Layout;
const token = localStorage.getItem("userLogin");
if (token) {
  store.dispatch(loginSuccess(token));
}

class App extends Component {
  onLogout = () => {
    store.dispatch(logoutUser());
    return <Redirect to="/"/>
  };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Layout>
            <Header>
              <AppHeader logout={this.onLogout}/>
            </Header>
            <Content
              style={{
                height: "100%",
                padding: "0 80px",
                background: "#ffffff  "
              }}
            >
              <Switch>
                <Route exact path="/" component={LoginContainer}/>
                <Route exact path="/register" component={RegisterContainer}/>
                <ProtectedRoutes exact path="/home" component={CompanyList}/>
                <ProtectedRoutes
                  path="/create-company"
                  component={() => <CreateCompanyContainer mode={"create"}/>}
                />
                <ProtectedRoutes
                  exact
                  path="/company/:companyId"
                  component={props => {
                    const companyId = props.location.pathname.replace("/company/", "");
                    return (
                      <CreateCompanyContainer
                        companyId={companyId}
                        mode={"edit"}
                      />
                    );
                  }}
                />
              </Switch>
            </Content>
            <Footer
              style={{
                background: "#011529",
                color: "#ffffff"
              }}
            >
              <AppFooter/>
            </Footer>
          </Layout>
        </Router>
      </Provider>
    );
  }
}

export default App;
