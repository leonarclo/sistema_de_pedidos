import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IArquivo } from "../../types";
import { pedidoApi } from "../api/pedidoApi";

interface IArquivoState {
  arquivos: IArquivo[] | [];
}

const initialState: IArquivoState = {
  arquivos: [],
};

export const arquivosSlice = createSlice({
  name: "arquivosSlice",
  initialState,
  reducers: {
    arquivosState: (state, action: PayloadAction<IArquivo[] | []>) => {
      state.arquivos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      pedidoApi.endpoints.buscarArquivos.matchFulfilled,
      (state, { payload }) => {
        state.arquivos = payload;
      }
    );
  },
});

export default arquivosSlice.reducer;

export const { arquivosState } = arquivosSlice.actions;
