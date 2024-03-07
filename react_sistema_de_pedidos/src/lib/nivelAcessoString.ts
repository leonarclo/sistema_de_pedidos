export const nivelAcessoString = (nivel: number | unknown): string => {
  switch (nivel) {
    case 9:
      return "Master";
    case 7:
      return "ADM";
    case 5:
      return "Editor";
    case 1:
      return "Consultor";
    case 0:
      return "Inativo";
    default:
      return "Desconhecido";
  }
};
