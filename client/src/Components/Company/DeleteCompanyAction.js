import React, { Component } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, Button } from "antd";
import ShowToast from "../../Utils/ShowToast";
import CompanyService from "../../Services/CompanyService";

const { confirm } = Modal;

function showDeleteConfirm(companyId) {
  confirm({
    title: "Are you sure to delete this company?",
    icon: <ExclamationCircleOutlined />,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      CompanyService.deleteCompany(companyId)
        .then(() => {
          ShowToast("Company deleted successfully", "success");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        })
        .catch(() => {
          ShowToast("Couldn't delete Company", "error");
        });
    },
    onCancel() {
      console.log("Cancel");
    }
  });
}

class DeleteCompanyAction extends Component {
  constructor() {
    super();
  }

  render() {
    const { companyId } = this.props;
    return (
      <Button
        onClick={() => showDeleteConfirm(companyId)}
        type="danger"
        ghost
        style={{ marginLeft: "1rem" }}
        size="small"
      >
        Delete
      </Button>
    );
  }
}

export default DeleteCompanyAction;
