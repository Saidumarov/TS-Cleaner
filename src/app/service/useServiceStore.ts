import { create } from "zustand";
import axios from "axios";

import {
  ServiceAdd,
  ServiceConfig,
  ServiceEdit,
  getSearchT,
  getServiceT,
} from "../../types";

const API_BASE_URL = "https://app.olimjanov.uz/v1/service";
const useServiceStore = create<ServiceConfig>((set) => ({
  data: [],
  loading: false,
  error: "",
  render: null,
  // get
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
      const getdata = await res?.data;
      set({ data: getdata?.services, error: "" });
    } catch (error) {
      set({ error: error });
    } finally {
      set({ loading: false });
    }
  },
  // post add
  addService: async (serviceData: ServiceAdd, token) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/create`, serviceData, {
        headers: {
          Authorization: token,
        },
      });
      const getdata = await res;
      set({ render: getdata, error: "" });
    } catch (error) {
      set({ error: error });
    } finally {
      set({ loading: false });
    }
  },
  // delete
  deleteService: async (id: string, token: string) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}?id=${id}`, {
        headers: {
          Authorization: token,
        },
      });
      const getdata = await res;
      set({ render: getdata, error: "" });
    } catch (error) {
      set({ error: error });
    } finally {
      set({ loading: false });
    }
  },
  // update
  updateService: async (data: ServiceEdit, token: string) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/update/${data?.id}`, data, {
        headers: {
          Authorization: token,
        },
      });
      const getdata = await res;
      set({ render: getdata, error: "" });
    } catch (error) {
      set({ error: error });
    } finally {
      set({ loading: false });
    }
  },
  // search
  getSearch: async (data: getSearchT) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/search?page=${data?.page}&limit=${data?.limit}&name=${data?.name}&owner_email=${data?.ownerEmail}`,
        {
          headers: {
            Authorization: data?.token,
          },
        }
      );
      const getdata = await res.data;
      console.log(getdata);
      // set({ data: getdata?.services, error: "" });
    } catch (error) {
      set({ error: error });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useServiceStore;
