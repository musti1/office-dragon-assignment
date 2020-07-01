import React, {Component} from "react";
import {Button, Col, Row, Table, Input} from "antd";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import CSVReader from 'react-csv-reader'
import {loadCompanyList} from "../../Redux/Actions/CompanyList";
import DeleteCompanyAction from "./DeleteCompanyAction";
import CompanyService from "../../Services/CompanyService";
import ShowToast from "../../Utils/ShowToast";

const {Search} = Input;
const userId = localStorage.getItem('userLogin');

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "companyName",
    render: text => text
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "companyDescription",
    render: text => text
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "companyTags",
    render: text => text
  },
  {
    title: "Action",
    key: "action",
    render: value => (

      <Col>
        {userId === value.userId && (
          <>
            <Link to={`/company/${value.companyId}`}>
              <Button type="primary" size="small" ghost>
                Edit
              </Button>
            </Link>
            <DeleteCompanyAction
              campaignId={value.companyId}
            />
          </>
        )}
      </Col>
    )
  }
];

class CompanyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNo: 1,
      searchTerm: ""
    };
  }

  componentDidMount() {
    const {searchText, pageNo} = this.state;
    this.props.loadCompanyList(searchText, pageNo);
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      const {searchTerm, pageNo} = this.state;
      this.props.loadCompanyList(searchTerm, pageNo);
    }
  }

  handlePaginationChange = pagination => {
    this.setState({pageNo: pagination.current});
  };

  handleSearch = searchTerm => {
    this.setState({searchTerm, pageNo: 1});
  };

  render() {
    const {companyData, isLoading} = this.props;
    const parseOptions = {
      header: true,
      skipEmptyLines: true,
    };

    return (
      <Col style={{paddingTop: 20}} gutter={24}>
        <Row gutter={[8, 8]}>
          <Col span={18}>
            <h1 style={{paddingLeft: 10, margin: "none"}}>Companies List</h1>
          </Col>
          <Col span={6} style={{paddingRight: 10, margin: "none"}}>
            <Search
              placeholder="Filter campaign by name"
              onSearch={this.handleSearch}
              loading={isLoading}
            />
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={24} style={{padding: 10, margin: "none"}}>
            <Table
              style={{
                boxShadow: "rgba(136, 136, 139, 0.12) 0px 0px 10px 0px"
              }}
              onChange={this.handlePaginationChange}
              columns={columns}
              dataSource={companyData.map(company => {
                company.key = company.companyId;
                return company;
              })}
              loading={isLoading}
            />
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={10} style={{paddingRight: 10, margin: "none"}}>
            <CSVReader
              cssClass="csv-reader-input"
              label="Select CSV to upload company in bulk"
              onFileLoaded={(data, fileInfo) => {
                this.setState({loading: true});
                CompanyService.uploadInBulk(data).then(success => {
                  ShowToast("Company saved successfully", "success");
                })
              }}
              parserOptions={parseOptions}
              inputId="ObiWan"
              inputStyle={{color: 'red'}}
            />
          </Col>
        </Row>
      </Col>
    );
  }
}

const mapStateToProps = state => {
  return state.companyList;
};

const mapDispatchToProps = dispatch => {
  return {
    loadCompanyList: (searchTerm, pageNo) =>
      dispatch(loadCompanyList(searchTerm, pageNo))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyList);
