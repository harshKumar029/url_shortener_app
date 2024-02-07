import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';
const urlshot_API = `${API_BASE_URL}/url_shot`;
const USER_API_URL = `${API_BASE_URL}/auth`;


// Function to log in a user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${USER_API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// Function to register a new user
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

// Function to retrieve user dashboard data
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

// Function to delete URL data
export const deleteUrlData = async (email, id) => {
  try {
    const response = await axios.delete(urlshot_API, { data: { email, id } });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

// Add more API functions as needed

