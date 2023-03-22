import { companyService } from "../services/companyService";
import {
  getCompanies,
  setCompanies,
  setDetails,
  setUsers,
} from "./companyReducer";

export const getCompaniesList = () => async (dispatch) => {
  await dispatch(getCompanies());
  const data = await companyService.getCompanies();

  await dispatch(setCompanies(data));
};

export const fetchCompanyData = (id) => async (dispatch) => {
  const response = await companyService.getDetails(id);

  if (response && response.status !== 404) {
    await dispatch(setDetails(response.data));
  } else {
    throw Error("Nie znaleziono firmy");
  }
};

export const fetchCompanyUsers = (id) => async (dispatch) => {
  const data = await companyService.getUser(id);

  await dispatch(setUsers(data));
};
