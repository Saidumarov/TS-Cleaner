import { create } from "zustand";
import axios from "axios";

import {
  ServiceAdd,
  ServiceConfig,
  ServiceEdit,
  getServiceT,
} from "../../types";
import { Api } from "../api";

const API_BASE_URL = "https://app.olimjanov.uz/v1/service";

const useServiceStore = create<ServiceConfig>((set) => ({
  data: [],
  loading: false,
  error: "",
  getService: async (data: getServiceT) => {
    set({ loading: true });
    try {
      const res = await axios.get(
        `${API_BASE_URL}/get-all?page=${data?.page}&limit=${data?.limit}&owner_email=${data?.ownerEmail}`,
        {
          headers: {
            Authorization: data?.token,
          },
        }
      );
      set({ data: res?.data?.services, error: "" });
    } catch (error) {
      set({ error: error });
    } finally {
      set({ loading: false });
    }
  },
  addService: async (serviceData: ServiceAdd, token) => {
    set({ loading: true });
    try {
      const res = await axios.post(`${API_BASE_URL}/create`, serviceData, {
        headers: {
          Authorization: token,
        },
      });
      if (res.data) {
        await useServiceStore.getState().getService(Api);
      }
    } catch (error) {
      set({ error: error });
    } finally {
      set({ loading: false });
    }
  },
  deleteService: async (id: string, token: string) => {
    set({ loading: true });
    try {
      const res = await axios.delete(`${API_BASE_URL}?id=${id}`, {
        headers: {
          Authorization: token,
        },
      });
      if (res.data) {
        await useServiceStore.getState().getService(Api);
      }
    } catch (error) {
      set({ error: error });
    } finally {
      set({ loading: false });
    }
  },
  updateService: async (data: ServiceEdit, token: string) => {
    set({ loading: true });

    try {
      const res = await axios.put(`${API_BASE_URL}/update/${data?.id}`, data, {
        headers: {
          Authorization: token,
        },
      });
      if (res.data) {
        await useServiceStore.getState().getService(Api);
      }
    } catch (error) {
      set({ error: error });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useServiceStore;
