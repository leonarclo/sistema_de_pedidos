export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Cancelada":
      return "bg-red-400";
    case "Nota Fiscal":
      return "bg-green-400";
    case "Contrato":
      return "bg-orange-400";
    case "Aberta":
      return "bg-yellow-400";
    case "Aguardando Aceite":
      return "bg-blue-400";
    case "Aguardando Pagamento":
      return "bg-indigo-400";
    case "Teste 7 Dias":
      return "bg-purple-400";
    case "Finalizado":
      return "bg-grey-400";
    case "Atrelado":
      return "bg-pink-400";
    case "Enviado":
      return "bg-teal-400";
    case "Omie Contrato":
      return "bg-lime-400";
    case "Lançado OMIE":
      return "bg-deepOrange-400";
    case "Emitir NFSe":
      return "bg-cyan-400";
    case "Em Producao":
      return "bg-deepPurple-400";
    case "Recusado":
      return "bg-orange-600";
    case "Edicao":
      return "bg-yellow-600";
    case "Liberado Financeiro":
      return "bg-blue-500";
    case "Troca":
      return "bg-green-600";
    case "Bonificacao":
      return "bg-pink-600";
    default:
      return "";
  }
};
