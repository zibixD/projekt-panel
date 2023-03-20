import apiService from "./apiService";

class CompanyService {
  async getCompanies() {
    const response = await apiService.get("/companies");

    return response.data;
  }
}

export const companyService = new CompanyService();
