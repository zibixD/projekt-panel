import apiService from "./apiService";

class CompanyService {
  async getCompanies() {
    const response = await apiService.get("/admin/companies");

    return response.data;
  }

  async getDetails(id) {
    const response = await apiService.get(`/admin/companies/${id}`);

    return response;
  }

  async putDetails(id, data) {
    const response = await apiService.put(`/admin/companies/${id}`, data);

    return response;
  }

  async getUser(id) {
    const response = await apiService.get(`/admin/companies/${id}/users`);

    return response.data;
  }

  async addUser(data) {
    const response = await apiService.post(`/admin/users`, data);

    return response;
  }
}

export const companyService = new CompanyService();
