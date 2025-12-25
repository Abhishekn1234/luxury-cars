import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/services`;

// const token = () => localStorage.getItem("token");

export const getServices = () => axios.get(API_URL);

export const createServices = (data: FormData) =>
  axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const updateServices = (id: string, data: FormData) =>
  axios.put(`${API_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const deleteServices = (id: string) =>
  axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

