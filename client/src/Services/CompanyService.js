import axios from "axios";

export default class CompanyService {
  static async create(companyData) {
    const userId = localStorage.getItem('userLogin');
    const res = await axios.post(
      "http://localhost:4000/api/company/create",
      companyData,
      {headers: {Authorization: userId}}
    );
    return res.data;
  }

  static async uploadInBulk(csvData) {
    const userId = localStorage.getItem('userLogin');
    const companiesData = csvData.map(data => {
      data.userId = userId;
      return data
    });

    const res = await axios.post(
      "http://localhost:5000/api/company/add",
      companiesData,
      {
        headers: {
          Authorization: userId,
          ContentType: "application/json"
        }
      }
    );
    return res.data;
  }

  static async getAll(term, pageNo) {
    const userId = localStorage.getItem('userLogin');
    let res = await axios.get(
      `http://localhost:4000/api/company/list?term=${term}&pageNo=${pageNo}`,
      {headers: {Authorization: userId}}
    );
    return res.data;
  }

  static async getCompany(companyId) {
    const userId = localStorage.getItem('userLogin');
    let res = await axios.get(
      `http://localhost:4000/api/company/${companyId}`,
      {headers: {Authorization: userId}}
    );
    return res.data;
  }

  static async deleteCompany(companyId) {
    const userId = localStorage.getItem('userLogin');
    let res = await axios.delete(
      `http://localhost:4000/api/company/delete/${companyId}`,
      {headers: {Authorization: userId}}
    );
    return res.data;
  }

  static async updateCompany(companyId, companyData) {
    const userId = localStorage.getItem('userLogin');
    let res = await axios.put(
      `http://localhost:4000/api/company/${companyId}/update`,
      companyData,
      {
        headers: {
          Authorization: userId
        }
      }
    );
    return res.data;
  }
}
