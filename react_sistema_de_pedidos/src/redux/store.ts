import { configureStore } from "@reduxjs/toolkit";
import { pedidoApi } from "./api/pedidoApi";
import { usuariosApi } from "./api/usuariosApi";
import { authApi } from "./api/authApi";
import modalReducer from "./features/modalSlice";
import authReducer from "./features/authSlice";
import pedidoReducer from "./features/pedidoSlice";
import usuarioReducer from "./features/usuariosSlice";
import itensPedidoReducer from "./features/itensPedidoSlice";
import arquivosReducer from "./features/arquivosSlice";
import produtoReducer from "./features/produtosSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { filesApi } from "./api/filesApi";
export const store = configureStore({
  reducer: {
    [pedidoApi.reducerPath]: pedidoApi.reducer,
    [usuariosApi.reducerPath]: usuariosApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
    modalState: modalReducer,
    pedidoState: pedidoReducer,
    editarPedidoState: pedidoReducer,
    usuarioState: usuarioReducer,
    editarUsuarioState: usuarioReducer,
    produtoState: produtoReducer,
    editarProdutoState: produtoReducer,
    itensPedidoState: itensPedidoReducer,
    pedidoSelecionadoState: pedidoReducer,
    arquivosState: arquivosReducer,
    getUserState: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(
      pedidoApi.middleware,
      usuariosApi.middleware,
      authApi.middleware,
      filesApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
