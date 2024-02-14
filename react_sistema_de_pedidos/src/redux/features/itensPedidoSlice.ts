import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IItemPedido } from "../../types";
import { pedidoApi } from "../api/pedidoApi";

interface IItemPedidoState {
  itens: IItemPedido[] | [];
}

const initialState: IItemPedidoState = {
  itens: [],
};

export const itensPedidoSlice = createSlice({
  name: "itensPedidoSlice",
  initialState,
  reducers: {
    itensPedidoState: (state, action: PayloadAction<IItemPedido[] | []>) => {
      state.itens = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      pedidoApi.endpoints.buscarItem.matchFulfilled,
      (state, { payload }) => {
        state.itens = payload;
      }
    );
  },
});

export default itensPedidoSlice.reducer;

export const { itensPedidoState } = itensPedidoSlice.actions;
