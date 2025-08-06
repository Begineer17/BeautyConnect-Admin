import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:3443";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getReviewsBySpaId = async (spaId: string) => {
    try {
        const response = await api.get(`${API_URL}/reviews/salon/${spaId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching reviews:", error);
        throw error;
    }
}