import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IPedido } from "../../types";

interface IPedidoState {
  pedido: IPedido | null;
  editarPedido: IPedido | null;
}

const initialState: IPedidoState = {
  pedido: null,
  editarPedido: null,
};

export const pedidoSlice = createSlice({
  name: "pedidoSlice",
  initialState,
  reducers: {
    pedidoState: (state, action: PayloadAction<IPedido>) => {
      state.pedido = action.payload;
    },
    editarPedidoState: (state, action: PayloadAction<IPedido | null>) => {
      state.editarPedido = action.payload;
    },
  },
});

export default pedidoSlice.reducer;

export const { pedidoState, editarPedidoState } = pedidoSlice.actions;
