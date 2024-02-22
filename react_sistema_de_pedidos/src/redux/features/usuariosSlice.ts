import { IUsuario } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUsuarioState {
  usuario: IUsuario | null;
  editarUsuario: IUsuario | null;
}

const initialState: IUsuarioState = {
  usuario: null,
  editarUsuario: null,
};

export const usuarioSlice = createSlice({
  name: "usuarioSlice",
  initialState,
  reducers: {
    usuarioState: (state, action: PayloadAction<IUsuario>) => {
      state.usuario = action.payload;
    },
    editarUsuarioState: (state, action: PayloadAction<IUsuario | null>) => {
      state.editarUsuario = action.payload;
    },
  },
});

export default usuarioSlice.reducer;

export const { usuarioState, editarUsuarioState } = usuarioSlice.actions;
