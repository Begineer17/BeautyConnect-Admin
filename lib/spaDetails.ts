import axios from "axios";
import {normalizeSpaDetails} from "@/lib/normalize";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:3443";

export const getSalonDetails = async (salonId: string) => {
  try {
    const response = await axios.get(
      `${API_URL}/salon-profile/spa/${salonId}`
    );
    if(response.data) {
      return normalizeSpaDetails(response.data);
    }

  } catch (error) {
    console.error("Error fetching salon details:", error);
    throw error;
  }
};