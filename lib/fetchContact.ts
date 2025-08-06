import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://localhost:3443";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getContacts = async () => {
    try {
        const res = await api.get(`${API_URL}/contacts`, {
            withCredentials: true, // nếu bạn cần cookie sau đăng nhập
        });
        return res.data;
    } catch (err) {
        console.error("Error fetching contacts", err);
        throw err;
    }
};

export const updateContactStatus = async (contactId: string) => {
    try {
        const res = await api.put(`${API_URL}/contacts`, {
            contactId: contactId,
        });

        return res.data; // { message: "Updated", updatedContact: {...} }
    } catch (err) {
        console.error("Error updating contact status", err);
        throw err;
    }
};