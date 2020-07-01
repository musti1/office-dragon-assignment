import React, {Component} from "react";

import {connect} from "react-redux";
import {
  enterCreateMode,
  enterEditMode,
  createCompany,
  updateCompany
} from "../../Redux/Actions/Company";
import {Form, Input, Row, Col, Button, Select, Typography} from "antd";

const {Title} = Typography;
const {TextArea} = Input;
const {Option} = Select;
const optionsList = ["CH", "ES", "FR", "GB"];

const layout = {
  labelCol: {span: 24},
  wrapperCol: {span: 18}
};

class CreateCompanyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      tags: [],
    }
  }

  handleSubmit = () => {
    if(this.props.mode === 'create') {
      this.props.createCompany(this.state)
    } else {
      this.props.updateCompany(this.props.companyId, this.state)
    }
  };

  handleName = (e) => {
    this.setState({name: e.target.value})
  };

  handleDescription = (e) => {
    this.setState({description: e.target.value})
  };

  handleTags = (tags) => {
    this.setState({tags})
  };

  componentDidMount() {
    if (this.props.mode === "create") {
      this.props.enterCreateMode();
    } else {
      this.props.enterEditMode(this.props.companyId);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      JSON.stringify(prevProps) !== JSON.stringify(this.props) &&
      this.props.currentCompanyId
    ) {

      this.setState({
        name: this.props.company.name,
        description: this.props.company.description,
        tags: this.props.company.tags,
      });
    }
  }

  render() {
    const companyTags = optionsList.map((option, k) => {
      return <Option key={option}>{option}</Option>;
    });

    return (
      <Row>
        <Col span={24}>
          <Form
            {...layout}
            style={{width: "95%", margin: "3rem auto"}}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Title level={3}>Company Details </Title>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Title"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input Title"
                    }
                  ]}
                >
                  <Input value={this.state.name} onChange={this.handleName} placeholder="Title"/>
                </Form.Item>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please input Description"
                    }
                  ]}
                >
                  <TextArea
                    value={this.state.description}
                    onChange={this.handleDescription}
                    rows={4}
                    placeholder="Description"
                  />
                </Form.Item>
                <Form.Item
                  label="Tags"
                  name="tags"
                  rules={[
                    {
                      required: true,
                      message: "Please input Description"
                    }
                  ]}
                >
                  <Select
                    mode="multiple"
                    placeholder="Select Nationality"
                    value={this.state.tags}
                    onChange={this.handleTags}
                    style={{width: "80%", marginBottom: "40px"}}
                  >
                    {companyTags}
                  </Select>

                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Form.Item>
                <Button type="primary" onClick={this.handleSubmit} htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return state.company
}

const CreateCompanyContainerWrapped = Form.create({name: "CreateCompanyContainer"})(
  CreateCompanyContainer
);
export default connect(
  mapStateToProps,
  {
    enterCreateMode,
    enterEditMode,
    createCompany,
    updateCompany
  }
)(CreateCompanyContainerWrapped);
