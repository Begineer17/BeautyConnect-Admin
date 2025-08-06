// hooks/use-service.ts
"use client";

import { useEffect, useState } from "react";
import { getServiceBySpaId, updateService, deleteService, createService } from "@/lib/fetchService";
import { CreateServiceInput, Service, UpdateServiceInput } from "@/types/service";

export function useService(spaId: string) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!spaId) return;
    const fetchServices = async () => {
      try {
        const data = await getServiceBySpaId(spaId);
        setServices(data);
      } catch (err: any) {
        setError(err?.message || "Lỗi khi tải dịch vụ");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [spaId]);

  const handleUpdateService = async (input: UpdateServiceInput) => {
    try {
      const updatedService = await updateService(input)
      setServices(prev =>
        prev.map(service =>
          service.id === updatedService.id ? updatedService : service
        )
      )
      return updatedService
    } catch (error) {
      console.error('Error updating service:', error)
      throw error
    }
  }

  const handleCreateService = async (input: CreateServiceInput) => {
    try {
      const newService = await createService({ ...input });
      if (!newService || !newService.id) {
        throw new Error('Invalid service data returned from server');
      }
      setServices(prev => [...prev, newService]);
      return newService;
    } catch (error) {
      console.error('Error creating service:', error);
      throw error;
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      await deleteService(id)
      setServices(prev => prev.filter(service => service.id !== id))
    } catch (error) {
      console.error('Error deleting service:', error)
      throw error
    }
  }

  return {
    services,
    loading,
    error,
    handleUpdateService,
    handleDeleteService,
    handleCreateService,
  }
}