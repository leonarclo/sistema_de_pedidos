package com.leonardo.spring_sistema_de_pedidos.dto;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

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
public class ItemPedidoResponseDTO {
    String patternChave = "yyMMddHHmmss";
    DateFormat fmtChave = new SimpleDateFormat(patternChave);
    Date today = Calendar.getInstance().getTime();
    private String chave = fmtChave.format(today);
    private String categoria;
    private String produto;
    private String preco;
    private String quantidade;
    private String precoTotal;
    private String numeroFuncionarios = "";
    private String valorMensal = "";
    private String formaPagamento;
    private String vencimento1Boleto;
    private String tipoPagamento;
    private String duracaoContrato = "";
    private String vigenciaInicio = "";
    private String vigenciaFim = "";
}