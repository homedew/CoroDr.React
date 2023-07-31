import axios from 'axios';

const api = axios.create({
  timeout: 5000, // Set a timeout for requests (optional)
});

export const get = async (baseUrl, endpoint, params = {}) => {
  try {
    const response = await api.get(`${baseUrl}${endpoint}`, { params });
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const post = async (baseUrl, endpoint, data) => {
  try {
    const response = await api.post(`${baseUrl}${endpoint}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const put = async (baseUrl, endpoint, data) => {
  try {
    const response = await api.put(`${baseUrl}${endpoint}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const del = async (baseUrl, endpoint) => {
  try {
    const response = await api.delete(`${baseUrl}${endpoint}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

const handleApiError = (error) => {
  // You can implement custom error handling here if needed
  console.error('API Error:', error);
};
