import axios from "axios";

const API = axios.create({
  baseURL: "https://studyplannerapp-vmp4.onrender.com/api/auth",
});

// REGISTER
export const registerUser = async (formData) => {

  const response =
    await API.post(
      "/register",
      formData
    );

  return response.data;

};

// LOGIN
export const loginUser = async (loginData) => {

  const response =
    await API.post(
      "/login",
      loginData
    );

  return response.data;

};