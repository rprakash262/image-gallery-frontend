import { createSlice, } from "@reduxjs/toolkit";

interface BreadcrumsState {
  breadcrumsSteps: string[];
}

const initialState: BreadcrumsState = {
  breadcrumsSteps: [],
}

const breadcrumsSlice = createSlice({
  name: "breadcrums",
  initialState,
  reducers: {
    setBreadcrumsSteps: (state, action) => {
      state.breadcrumsSteps = action.payload;
    },
    insertBreadcrumsStep: (state, action) => {
      state.breadcrumsSteps.push(action.payload)
    }
  }
})

export const { setBreadcrumsSteps, insertBreadcrumsStep } = breadcrumsSlice.actions;

export default breadcrumsSlice.reducer;