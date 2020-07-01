import axios from "axios";
export default class AuthService {
  static async registerUser(registerData) {
    console.log(registerData)
    const res = await axios.post(
      "http://localhost:4000/api/auth/sign-up",
      registerData
    );
    return res.data;
  }
  static async loginUser(loginData) {
    let res = await axios.post(
      "http://localhost:4000/api/auth/login",
      loginData
    );
    const { userId } = await res.data;

    if (userId) {
      localStorage.setItem("userLogin", userId);
    }
    return res.data;
  }

  static logoutUser() {
    console.log("hereee")
    localStorage.removeItem("userLogin");
  }
}
