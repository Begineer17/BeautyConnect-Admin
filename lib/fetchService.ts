import axios from "axios";
import { UpdateServiceInput, CreateServiceInput } from "@/types/service";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getServiceBySpaId = async (spaId: string) => {
  try {
    const response = await axios.get(`${API_URL}/services/${spaId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const createService = async (input: CreateServiceInput)  => {
  const formData = new FormData();
  formData.append('name', input.name || '');
  formData.append('category', JSON.stringify(input.category || []));
  formData.append('description', input.description || '');
  formData.append('originalPrice', input.originalPrice || '0');
  formData.append('currentPrice', input.currentPrice || '0');
  formData.append('duration', input.duration || '0');
  formData.append('isHome', String(input.isHome));
  if (input.imageFile) {
    formData.append('illustrationImage', input.imageFile);
  }

  try {
    const response = await axios.post(`${API_URL}/salon-profile/services`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    console.log('Create service response:', response.data);
    return response.data.service;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

export const updateService = async (input: UpdateServiceInput) => {
  if (!input.serviceId) throw new Error("serviceId is required");
  console.log(input.serviceId);
  const formData = new FormData();
  formData.append('name', input.name || '');
  formData.append('description', input.description || '');
  formData.append('originalPrice', input.originalPrice || '0');
  formData.append('currentPrice', input.currentPrice || '0');
  formData.append('duration', input.duration || '0');
  formData.append('isHome', String(input.isHome));
  if (input.imageFile) {
    formData.append('image', input.imageFile);
  }

  try {
    const response = await axios.put(`${API_URL}/salon-profile/services/${input.serviceId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    console.log('Response data:', response.data);
    return response.data.service;
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

export const deleteService = async (serviceId: string) => {
    try {
        const res = await axios.delete(`${API_URL}/salon-profile/services/${serviceId}`, {withCredentials: true});
        return res.data; // { message: 'Service deleted' }
    } catch (err) {
        console.error("Error deleting service:", err);
        throw err;
    }
};