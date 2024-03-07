export const categoriaString = (nivel: number | unknown): string => {
  switch (nivel) {
    case 1:
      return "Venda";
    case 2:
      return "Contrato";
    default:
      return "Desconhecido";
  }
};
