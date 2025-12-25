import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/cars`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Car {
  _id?: string;
  name: string;
  model: string;
  year: number;
  price: number;
  mileage: string;
  fuelType: string;
  transmission: string;
  location: string;
  image?: string;
  description?:string;
  theme?:string;
  condition: "Excellent" | "Good" | "Fair";
  featured: boolean;
  isFavorite: boolean;
}

export const getCars = (params: any) => API.get("/", { params });
export const createCar = (data: FormData) =>
  API.post("/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateCar = (id: string, data: FormData) =>
  API.put(`/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteCar = (id: string) => API.delete(`/${id}`);
export const toggleFavorite = (id: string) =>
  API.patch(`/${id}/favorite`);
