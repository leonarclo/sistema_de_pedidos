package com.leonardo.spring_sistema_de_pedidos.dto;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SaveAndUpdatePedidoDTO {
        String patternChave = "yyMMddHHmmss";
        String patternDataEHora = "yyyy-MM-dd HH:mm";
        String patternData = "yyyy-MM-dd";

        DateFormat fmtChave = new SimpleDateFormat(patternChave);
        DateFormat fmtData = new SimpleDateFormat(patternDataEHora);
        Date today = Calendar.getInstance().getTime();

        private String chave = fmtChave.format(today);
        private String data = fmtData.format(today);
        private String empresa;
        private String consultor;
        private String cargoCliente;
        private String leadOrigem;
        private String leadData;
        private String cnpj;
        private String email;
        private String status;
        private String telefone1;
        private String telefone2 = "";
        private String logradouro;
        private String numeroEndereco;
        private String bairro;
        private String complemento = "";
        private String cep;
        private String cidade;
        private String estado;
        private String transportadora = "";
        private String fretePreco = "";
        private String nomeCliente;
        private String cpfCliente;
        private String categoriaGrupo;
        private String categoria = "";
        private String planilhaVendas = "";
        private Integer licencaGerada = 0;
        private Integer assinatura = 0;
        private Integer chat = 0;
        private Integer posVenda = 0;
        private String notaFiscal = "";
        private String unidadeNegocio = "";
        private String previsaoEntrega = "";
        private String numeroSerie = "";
        private String codigoRastreio = "";
        private String observacoes = "";
        private String emailLogin = "";
        private List<ItemPedidoResponseDTO> itens;
}
