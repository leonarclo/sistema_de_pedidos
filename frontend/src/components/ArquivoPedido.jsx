/* eslint-disable react/prop-types */
import { FileUpload } from "primereact/fileupload";
import { BASE_URL_API } from "../constants/baseUrlApi";

function ArquivoPedido({ setArquivo }) {
  const uploadUrl = `${BASE_URL_API}/inserir-arquivos`;

  const onUpload = (event) => {
    const files = event.files;
    const fileNames = [];

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileName = file.name;
      fileNames.push(fileName);

      formData.append("arquivo[]", file);
    }

    setArquivo(fileNames);

    fetch(uploadUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Erro ao enviar o arquivo:", error);
      });
  };
  return (
    <FileUpload
      mode="advanced"
      name="arquivo[]"
      url={uploadUrl}
      accept={[".pdf", ".jpg", ".jpeg", ".webp", ".png", ".gif"]}
      multiple
      chooseLabel="Adicionar Arquivo"
      chooseOptions={{ className: "p-2 m-2" }}
      uploadLabel="Enviar Arquivo(s)"
      uploadOptions={{ className: "p-2 m-2 bg-green-500 text-white" }}
      cancelLabel="Limpar"
      cancelOptions={{ className: "p-2" }}
      maxFileSize={1000000}
      onUpload={onUpload}
      invalidFileSizeMessageSummary="Arquivo muito grande! >"
      invalidFileSizeMessageDetail="O tamanho máximo é de 976.563 KB."
    />
  );
}

export default ArquivoPedido;
