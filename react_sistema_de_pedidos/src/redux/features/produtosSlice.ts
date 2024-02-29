import { IProduto } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IProdutoState {
  produto: IProduto | null;
  editarProduto: IProduto | null;
}

const initialState: IProdutoState = {
  produto: null,
  editarProduto: null,
};

export const produtoSlice = createSlice({
  name: "produtoSlice",
  initialState,
  reducers: {
    produtoState: (state, action: PayloadAction<IProduto>) => {
      state.produto = action.payload;
    },
    editarProdutoState: (state, action: PayloadAction<IProduto | null>) => {
      state.editarProduto = action.payload;
    },
  },
});

export default produtoSlice.reducer;

export const { produtoState, editarProdutoState } = produtoSlice.actions;
