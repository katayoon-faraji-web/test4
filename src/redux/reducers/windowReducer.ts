import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "windowWidth",
  initialState: { value:1400 },
  reducers: {
    setWindowWidth: (state,action) => {
      state.value  = action.payload;
    },
  },
});

export const { setWindowWidth} = userSlice.actions;
export default userSlice.reducer;