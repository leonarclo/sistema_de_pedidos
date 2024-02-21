$(document).ready(function () {
  $("#Salvar_button").click(function () {
    $("#user_form")[0].reset();
    $(".modal-title").text("Novo Pedido");
    $("#action").val("Salvar");
    $("#operacao").val("Salvar");
  });

  // |||||||||||||||||||||||||||||||||||||||||||||||

  var dataTable = $("#user_data").DataTable({
    // "pageLength": 20,
    processing: true,
    serverSide: true,
    order: [1, "desc"],
    ajax: {
      url: "buscar-enter.php",
      // url:"z-listar_usuarios.php",
      type: "POST",
    },
    fnRowCallback: function (row, data) {
      if (data[0] === "Cancelada") {
        $("td:eq(0)", row).addClass("red boxColor");
      }
      if (data[0] === "Nota Fiscal") {
        $("td:eq(0)", row).addClass("green boxColor");
      }
      if (data[0] === "Contrato") {
        $("td:eq(0)", row).addClass("orange boxColor");
      }
      if (data[0] === "Aberta") {
        $("td:eq(0)", row).addClass("yellow boxColor");
      }
      if (data[0] === "Aguardando Aceite") {
        $("td:eq(0)", row).addClass("darkBlue boxColor");
      }
      if (data[0] === "Aguardando Pagamento") {
        $("td:eq(0)", row).addClass("aguardandopagamento boxColor");
      }
      if (data[0] === "Teste 7 Dias") {
        $("td:eq(0)", row).addClass("purple boxColor");
      }
      if (data[0] === "Finalizado") {
        $("td:eq(0)", row).addClass("silver boxColor");
      }
      if (data[0] === "Atrelado") {
        $("td:eq(0)", row).addClass("atrelado boxColor");
      }
      if (data[0] === "Enviado") {
        $("td:eq(0)", row).addClass("enviado boxColor");
      }
      if (data[0] === "Omie Contrato") {
        $("td:eq(0)", row).addClass("omiecontrato boxColor");
      }
      if (data[0] === "Lançado OMIE") {
        $("td:eq(0)", row).addClass("lancadoomie boxColor");
      }
      if (data[0] === "Emitir NFSe") {
        $("td:eq(0)", row).addClass("emitirnfse boxColor");
      }
      if (data[0] === "Em Producao") {
        $("td:eq(0)", row).addClass("emProducao boxColor");
      }

      if (data[0] === "Recusado") {
        $("td:eq(0)", row).addClass("recusado boxColor");
      }

      if (data[0] === "Edicao") {
        $("td:eq(0)", row).addClass("edicao boxColor");
      }

      if (data[0] === "Bonificacao") {
        $("td:eq(0)", row).addClass("blueboni boxColor");
      }

      if (data[0] === "Liberado Financeiro") {
        $("td:eq(0)", row).addClass("liberadoFinanceiro boxColor");
      }

      if (data[0] === "Troca") {
        $("td:eq(0)", row).addClass("troca boxColor");
      }

      if (data[3].length > 30) {
        $("td:eq(3)", row).addClass("truncate").attr("title", data[3]);
      }

      if (data[3].length > 30) {
        $("td:eq(3)", row).addClass("truncate").attr("title", data[3]);
      }
    },
    columnDefs: [
      {
        targets: [0, 3, 4],
        orderable: false,
      },
    ],
    oLanguage: {
      sProcessing: "Processando...BRAVO",
      sLengthMenu: "Mostrar _MENU_ registros",
      sZeroRecords: "Não foram encontrados resultados",
      sInfo: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
      sInfoEmpty: "Mostrando de 0 até 0 de 0 registros",
      sInfoFiltered: "",
      sInfoPostFix: "",
      sSearch: "Buscar:",
      sUrl: "",
      oPaginate: {
        sFirst: "Primeiro",
        sPrevious: "Anterior",
        sNext: "Seguinte",
        sLast: "Último",
      },
    },
  });

  // |||||||||||||||||||||||||||||||||||||||||||||||

  $(document).on("submit", "#user_form", function (event) {
    event.preventDefault();

    var empresa = $("#empresa").val();
    var cnpj = $("#cnpj").val();

    //  condições
    if (empresa != "" && cnpj != "") {
      $.ajax({
        url: "inserir_pedido.php",
        method: "POST",
        data: new FormData(this),
        contentType: false,
        processData: false,
        success: function (data) {
          alert(data);
          $("#user_form")[0].reset();
          // esconde o modal
          $("#userModal").modal("hide");
          dataTable.ajax.reload();
          // console.log(FormData);
          //recarrega a página
          location.reload();
        },
      });
    } else {
      alert("Dados Obrigatórios não identificados");
    }
  });

  // |||||||||||||||||||||||||||||||||||||||||||||||

  $(document).on("click", ".update", function () {
    //solução by well
    $(".form-check-input").each(function (e) {
      $(this).prop("checked", false);
    });

    var usuario_id = $(this).attr("id");
    $.ajax({
      url: "busca_unica.php",
      method: "POST",
      data: { usuario_id: usuario_id },
      dataType: "json",
      success: function (data) {
        console.log("Email Login: " + data.emailLogin);

        $("#userModal2").modal("show");

        // $('#pedidon2').val(data.id);
        $("#chave2").val(data.chave);
        $("#pedidon2").html(data.id);
        $("#consultor2").html(data.consultor);
        $("#data2").html(data.data);
        $("#status2").html(data.status);
        $("#lead_data2").html(data.lead_data);
        $("#lead_origem2").html(data.lead_origem);
        $("#fechado2").html(data.fechado);
        $("#empresa2").html(data.empresa);

        $("#categoria2").val(data.categoria);
        $("#produto2").val(data.produto);
        $("#qtde2").val(data.qtde);
        $("#preco2").val(data.preco);
        $("#precototal2").val(data.precototal);
        $("#forma_pgto2").val(data.forma_pgto);
        $("#valor_mensal2").val(data.valor_mensal);
        $("#venc_1_boleto2").val(data.venc_1_boleto);
        $("#frete2").html(data.frete);
        $("#transportadora2").html(data.transportadora);
        $("#cnpj2").html(data.cnpj);
        $("#responsavel_nome2").html(data.responsavel_nome);
        $("#responsavel_cpf2").html(data.responsavel_cpf);
        $("#nfuncionarios2").val(data.nfuncionarios);
        $("#cidade2").html(data.cidade);
        $("#uf2").html(data.uf);
        $("#bairro2").html(data.bairro);
        $("#cep2").html(data.cep);
        $("#rua2").html(data.rua);
        $("#numero2").html(data.numero);
        $("#complemento2").html(data.complemento);
        $("#email2").html(data.email);
        $("#fone12").html(data.fone1);
        $("#fone22").html(data.fone2);
        $("#pagamentotipo2").val(data.pagamentotipo);
        $("#duracao2").val(data.duracao);
        $("#vigenciaIn2").val(data.vigenciaIn);
        $("#vigenciaOut2").val(data.vigenciaOut);
        $("#obs2").val(data.obs);
        $("#emailLogin2").html(data.emailLogin);

        $("#notaFiscal2").html(data.notaFiscal);
        $("#UnidadeNegocio2").html(data.UnidadeNegocio);
        $("#PrevisaoEntrega2").html(data.PrevisaoEntrega);
        $("#codigoRastreio2").html(data.codigoRastreio);

        $("#NumeroSerie2").val(data.NumeroSerie);

        $("#planilhaVendas2").val(data.planilhaVendas);
        $("#licencaGerada2").val(data.licencaGerada);
        $("#assinatura2").val(data.assinatura);
        $("#chat2").val(data.chat);
        $("#posVenda2").val(data.posVenda);

        $(".modal-title").text("Dados do Pedido: ");
        $("#usuario_id").val(usuario_id);
        $("#action").val("Edit");
        $("#operacao").val("Edit");

        $.ajax({
          url: "retornoGeral.php",
          method: "POST",
          data: { data: data.chave },
          success: function (result) {
            $("#userModal2").modal("show");
            $("#retornoForm").html(result);
          },
        });
      },
    });
  });

  // |||||||||||||||||||||||||||||||||||||||||||||||

  $(document).on("click", ".delete", function () {
    var usuario_id = $(this).attr("id");
    if (confirm("Tem certeza que deseja excluir esse Pedido ?")) {
      $.ajax({
        url: "delete.php",
        method: "POST",
        data: { usuario_id: usuario_id },
        success: function (data) {
          alert(data);
          dataTable.ajax.reload();
        },
      });
    } else {
      return false;
    }
  });

  // |||||||||||||||||||||||||||||||||||||||||||||||
});

$(function () {
  $("#categoria").change(function () {
    if ($(this).val() == "Venda") {
      $("#produtoload").load("includes/selectedVenda.php");
    }
    if ($(this).val() == "Contrato") {
      $("#produtoload").load("includes/selectedContrato.php");
    }
    if ($(this).val() == "Venda + Contrato") {
      $("#produtoload").load("includes/selectedVendaContrato.php");
    }
  });
});

// $(document).ready(function(){
//   $("#categoria").change(function(){
//     alert("The text has been changed.");
//   });
// });

// ===========================================================

// função para substituir , por .
// function virgula(){ var n1 = parseFloat(n1.replace(',','.')); }

// ===========================================================
// função para formatar moeda com milhar e centavos
// function formatarMoeda() {
//     var elemento = document.getElementById('preco');
//     var n1 = elemento.value;

//     n1 = n1 + '';
//     n1 = parseInt(n1.replace(/[\D]+/g, ''));
//     n1 = n1 + '';
//     n1 = n1.replace(/([0-9]{2})$/g, ",$1");

//     if (n1.length > 6) {
//         n1 = n1.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
//     }

//     elemento.value = n1;
//     if(n1 == 'NaN') elemento.value = '';

// }

// ===========================================================

// ===========================================================

// preencher campo de texto id=obs

$(document).ready(function () {
  // $('#alpha').click(function() {
  // $('#obs').append('\nTIPO: VENDA +CONTRATO \n \nCONTRATO: \n( ) SOFTWARE GOLD + SUPORTE \n( ) SOFTWARE GOLD SEM SUPORTE \n( ) SOFTWARE ESSENCIAL SEM SUPORTE \n( ) SOFTWARE ESSENCIAL COM SUPORTE \n( ) SOFTWARE GOLD + MOBILE + SUPORTE \n( ) SOFTWARE GOLD + MOBILE SEM SUPORTE \n( ) VIGIA BLUE \n( ) SUPORTE \n \nQUANTIDADE DE FUNCIONÁRIOS: \nVALOR MENSAL: \nVENCIMENTO 1º BOLETO: \nRESPONSÁVEL PELA ASSINATURA: \nCPF DO RESPONSÁVEL: \n*********************************************** \nVENDA \nFRETE: \nFORMA DE PAGAMENTO: \n \n \nDATA: \nORIGEM: \nNOME CONTATO: \n************************* \nOBSERVAÇÕES: \n \n_______________________________________________ \nGERENCIA: \n( ) Pedido liberado sem pendencias. \n( ) Serasa. \n( ) Pedido liberado com pendencias. \n( ) Forma de pagamento autorizada. \n( ) Aceite no contrato. \n_______________________________________________ \n \nADMINISTRATIVO: \nNota Fiscal: __________________________________ \nNúmeros de série: _____________________________ \nPrevisão de entrega:___________________________ \nUnidade de negócio:____________________________ \nPlanilha de vendas: ( ) \nLicença gerada: ( ) \nAssinaturas: ( ) \nChat: ( ) \nPós venda ( )');
  // $('#obs').append('INFORMACOES ADICIONAIS: ________________________\n_________________________________________________ \nGERENCIA: \n( ) Pedido liberado sem pendencias. \n( ) Serasa. \n( ) Pedido liberado com pendencias. \n( ) Forma de pagamento autorizada. \n( ) Aceite no contrato. \n_________________________________________________ \nADMINISTRATIVO: \nNota Fiscal: ____________________________________ \nNumeros de serie: _______________________________ \nPrevisao de entrega:_____________________________ \nUnidade de negocio:______________________________ \nPlanilha de vendas: ( ) \nLicenca gerada: ( ) \nAssinaturas: ( ) \nChat: ( ) \nPos venda ( )');
  $("#obs").append("INFORMACOES ADICIONAIS: ");
  // })
});

// ===========================================================

//function adicionarEndereco()
// disponivel em painel.php
// ~ na linha 414

// ===========================================================

// ===========================================================
// ===========================================================
// ===========================================================
// ===========================================================
