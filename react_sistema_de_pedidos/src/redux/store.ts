import { configureStore } from "@reduxjs/toolkit";
import { pedidoApi } from "./api/pedidoApi";
import { usuariosApi } from "./api/usuariosApi";
import modalReducer from "./features/modalSlice";
import pedidoReducer from "./features/pedidoSlice";
import usuarioReducer from "./features/usuariosSlice";
import itensPedidoReducer from "./features/itensPedidoSlice";
import arquivosReducer from "./features/arquivosSlice";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
export const store = configureStore({
  reducer: {
    [pedidoApi.reducerPath]: pedidoApi.reducer,
    [usuariosApi.reducerPath]: usuariosApi.reducer,
    modalState: modalReducer,
    pedidoState: pedidoReducer,
    editarPedidoState: pedidoReducer,
    usuarioState: usuarioReducer,
    editarUsuarioState: usuarioReducer,
    itensPedidoState: itensPedidoReducer,
    pedidoSelecionadoState: pedidoReducer,
    arquivosState: arquivosReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(pedidoApi.middleware, usuariosApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
