import { createSlice } from "@reduxjs/toolkit";

const initialCompanyState = {
  companies: [],
  isLoadingCompanies: true,
  details: null,
  isLoadingDetails: true,
  users: [],
  isLoadingUsers: true,
};

const companySlice = createSlice({
  name: "company",
  initialState: initialCompanyState,
  reducers: {
    getCompanies(state) {
      state.companies = [];
      state.isLoadingCompanies = true;
      state.isLoadingDetails = true;
      state.isLoadingUsers = true;
    },
    setCompanies(state, action) {
      state.companies = action.payload;
      state.isLoadingCompanies = false;
    },
    setDetails(state, action) {
      state.details = action.payload;
      state.isLoadingDetails = false;
    },
    setUsers(state, action) {
      state.users = action.payload;
      state.isLoadingUsers = false;
    },
  },
});

export const { getCompanies, setCompanies, setDetails, setUsers } =
  companySlice.actions;
export default companySlice.reducer;
