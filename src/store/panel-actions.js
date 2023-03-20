import { companyService } from "../services/companyService";
import { get } from "./companyReducer";

export const getCompanies = () => async (dispatch) => {
  const data = await companyService.getCompanies();

  await dispatch(get(data));
};

export const fetchCompnayData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch("https://dev.pgitdev.pl/admin/companies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const CompanyData = await response.json();
    };
  };
};
