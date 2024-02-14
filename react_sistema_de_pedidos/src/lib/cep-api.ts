import { useForm } from "react-hook-form";

export const cepApi = async (cep: string, form: ReturnType<typeof useForm>) => {
  try {
    const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      form.clearErrors("cep");
      const data = await response.json();
      return data;
    } else {
      const errorMessage =
        response.status === 404
          ? "Cep não encontrado!"
          : "Erro desconhecido no serviço de CEP.";
      form.setError("cep", {
        message: errorMessage,
        type: "typeError",
      });
    }
  } catch (error) {
    console.error("Error in cepApi:", error);
    throw new Error("Falha ao processar a solicitação de CEP.");
  }
};
