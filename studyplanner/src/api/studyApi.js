import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/study"
});

// GET TOKEN
const getToken = () => {
  return localStorage.getItem("token");
};

// CREATE STUDY
export const createStudy = async (studyData) => {
  const response =await API.post("/new/study",studyData,
      {
        headers: {
          Authorization:
            `Bearer ${getToken()}`
        }
      }
    );
  return response.data;
};

// GET STUDIES
export const getStudy = async () => {
  const response =  await API.get( "/study",
      {
        headers: {
          Authorization:
            `Bearer ${getToken()}`
        }
      }
    );
  return response.data;
};

// UPDATE STUDY
export const updateStudy = async (id, updatedData) => {
  const response = await API.put( `/${id}/update`, updatedData,
      {
        headers: {
          Authorization:
            `Bearer ${getToken()}`
        }
      }
    );
  return response.data;
};

// DELETE STUDY
export const deleteStudy = async (id) => {
  const response = await API.delete( `/${id}/delete`,
      {
        headers: {
          Authorization:
            `Bearer ${getToken()}`
        }
      }
    );
  return response.data;
};