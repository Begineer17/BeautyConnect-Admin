"use client"

import { useState, useEffect, useCallback } from "react";
import { getContacts, updateContactStatus } from "@/lib/fetchContact";
import { Contact } from "@/types/contact";

export function useContact() {
  const [countContacts, setCountContacts] = useState<number>(0);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadContacts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getContacts();
      setContacts(res.contacts);
      setCountContacts(res.count);
    } catch (err: any) {
      console.error("Failed to load contacts:", err);
      setError(err?.message || "Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleUpdateStatus = async (contactId: string) => {
    if (!contactId) {
        console.error("contactId is undefined or empty");
        return;
    }
    try {
        await updateContactStatus(contactId);
        await loadContacts();
    } catch (err) {
        console.error("Update status failed:", err);
    }
    };

  return {
    countContacts,
    contacts,
    loading,
    error,
    handleUpdateStatus, 
  }
}
