import apiService from "./apiService";

class CompanyService {
  async getCompanies() {
    const response = await apiService.get("/companies");

    return response.data;
  }

  async  getDetails(id) {
    const response = await apiService.get(`/companies/${id}`)
    
    return response.data
  }

  async getUser(id) {
    const response = await apiService.get(`/companies/${id}/users`)

    return response.data
  }
}

export const companyService = new CompanyService();
