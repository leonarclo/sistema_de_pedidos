import { ITokenPayload } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface IUsuarioState {
  usuario: ITokenPayload | null;
}

const initialState: IUsuarioState = {
  usuario: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    getUserState: (state, action: PayloadAction<ITokenPayload | null>) => {
      state.usuario = action.payload;
    },
  },
});

export default authSlice.reducer;

export const { getUserState } = authSlice.actions;
