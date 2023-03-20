import { createSlice } from "@reduxjs/toolkit";

const initialCompanyState = {
  companies: [],
};

const companySlice = createSlice({
  name: "company",
  initialState: initialCompanyState,
  reducers: {
    get(state, action) {
      state.companies = action.payload;
    },
  },
});

export const { get } = companySlice.actions;
export default companySlice.reducer;
