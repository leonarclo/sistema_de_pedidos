import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { JwtPayload } from "jwt-decode";

interface IUsuarioState {
  usuario: JwtPayload | null;
}

const initialState: IUsuarioState = {
  usuario: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    getUserState: (state, action: PayloadAction<JwtPayload | null>) => {
      state.usuario = action.payload;
    },
  },
});

export default authSlice.reducer;

export const { getUserState } = authSlice.actions;
