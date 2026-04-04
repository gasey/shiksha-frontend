import api from "./apiClient";

export const getFormFillupData = () => api.get("/accounts/form-fillup/");
export const submitFormFillup = (formData) => api.put("/accounts/form-fillup/", formData, { headers: { "Content-Type": "multipart/form-data" }, });
export const getStates = () => api.get("/accounts/states/");
export const getDistricts = (stateName) => api.get(`/accounts/states/${encodeURIComponent(stateName)}/districts/`);
