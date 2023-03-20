import { createSlice } from "@reduxjs/toolkit";

const initialCompanyState = {
  companies: [],
  isLoadingCompanies: true,
  details: null,
  users: [],
};

const companySlice = createSlice({
  name: "company",
  initialState: initialCompanyState,
  reducers: {
    getCompanies(state){
      state.companies = [];
      state.isLoadingCompanies = true;
    },
    setCompanies(state, action) {
      state.companies = action.payload;
      state.isLoadingCompanies = false;
    },
    setDetails(state, action) {
      state.details = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    }
  },
});

export const { getCompanies, setCompanies, setDetails, setUsers } = companySlice.actions;
export default companySlice.reducer;


