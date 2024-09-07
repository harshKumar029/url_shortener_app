import axios from 'axios';
// https://shortyfy.work.gd/
const API_BASE_URL = 'https://shortyfy.work.gd/api';
const urlshot_API = `${API_BASE_URL}/url_shot`;
const USER_API_URL = `${API_BASE_URL}/auth`;


export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${USER_API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${USER_API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const shortenUrl = async (urlData) => {
  try {
    const response = await axios.post(`${urlshot_API}`, urlData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getUserDashboard = async (email) => {
  try {
    const response = await axios.get(`${urlshot_API}/dashboard`,{
        params: { email: email }
      });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const deleteUrlData = async (data) => {
  try {
    const response = await axios.delete(`${urlshot_API}/deleteUrl`, { data: data });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

