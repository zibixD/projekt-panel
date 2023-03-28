import { companyService } from "../services/companyService";
import {
  getCompanies,
  setCompanies,
  setDetails,
  setUsers,
} from "./companyReducer";
import { dispatch } from "./storeMain";
import { showErrorSnack } from "./ui-actions";

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
    await dispatch(showErrorSnack("Nie znaleziono firmy"));
  }
};

export const updateCompanyData = (id, data) => async (dispatch) => {
  await companyService.putDetails(id);
};

export const fetchCompanyUsers = (id) => async (dispatch) => {
  const data = await companyService.getUser(id);

  await dispatch(setUsers(data));
};

export const addUser = (id, data) => async (dispatch) => {
  await companyService.addUser(id)
} 
