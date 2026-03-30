import api from "./apiClient";

export const getFormFillupData = () => api.get("/accounts/form-fillup/");

export const submitFormFillup = (data) => api.put("/accounts/form-fillup/", data);
