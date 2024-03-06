import { IUsuario } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface IUsuarioState {
  usuario: IUsuario | undefined;
}

const initialState: IUsuarioState = {
  usuario: undefined,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    getUserState: (state, action: PayloadAction<IUsuario | undefined>) => {
      state.usuario = action.payload;
    },
  },
});

export default authSlice.reducer;

export const { getUserState } = authSlice.actions;
