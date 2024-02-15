package com.leonardo.spring_sistema_de_pedidos.dto.mapper;

import com.leonardo.spring_sistema_de_pedidos.dto.PedidoDTO;
import com.leonardo.spring_sistema_de_pedidos.entities.Pedido;

public class PedidoMapper {
    public static PedidoDTO toPedidoDTO(Pedido pedido) {
        return new PedidoDTO(pedido.getId(), pedido.getChave(), pedido.getData(), pedido.getEmpresa(),
                pedido.getConsultor(), pedido.getCargoCliente(), pedido.getLeadOrigem(), pedido.getLeadData(),
                pedido.getCnpj(), pedido.getEmail(), pedido.getStatus(), pedido.getTelefone1(),
                pedido.getTelefone2(),
                pedido.getLogradouro(), pedido.getNumeroEndereco(), pedido.getBairro(), pedido.getComplemento(),
                pedido.getCep(), pedido.getCidade(), pedido.getEstado(), pedido.getTransportadora(),
                pedido.getFretePreco(),
                pedido.getNomeCliente(), pedido.getCpfCliente(), pedido.getCategoriaGrupo(), pedido.getCategoria(),
                pedido.getPlanilhaVendas(),
                pedido.getLicencaGerada(), pedido.getAssinatura(), pedido.getChat(), pedido.getPosVenda(),
                pedido.getNotaFiscal(), pedido.getUnidadeNegocio(), pedido.getPrevisaoEntrega(),
                pedido.getNumeroSerie(), pedido.getCodigoRastreio(),
                pedido.getObservacoes(), pedido.getEmailLogin());
    }

    public static Pedido toPedidoEntity(PedidoDTO pedidoDTO) {
        Pedido pedido = new Pedido();
        pedido.setId(pedidoDTO.id());
        pedido.setChave(pedidoDTO.chave());
        pedido.setData(pedidoDTO.data());
        pedido.setEmpresa(pedidoDTO.empresa());
        pedido.setConsultor(pedidoDTO.consultor());
        pedido.setCargoCliente(pedidoDTO.cargoCliente());
        pedido.setLeadOrigem(pedidoDTO.leadOrigem());
        pedido.setLeadData(pedidoDTO.leadData());
        pedido.setCnpj(pedidoDTO.cnpj());
        pedido.setEmail(pedidoDTO.email());
        pedido.setStatus(pedidoDTO.status());
        pedido.setTelefone1(pedidoDTO.telefone1());
        pedido.setTelefone2(pedidoDTO.telefone2() != null ? pedidoDTO.telefone2() : "");
        pedido.setLogradouro(pedidoDTO.logradouro());
        pedido.setNumeroEndereco(pedidoDTO.numeroEndereco());
        pedido.setBairro(pedidoDTO.bairro());
        pedido.setComplemento(pedidoDTO.complemento() != null ? pedidoDTO.complemento() : "");
        pedido.setCep(pedidoDTO.cep());
        pedido.setCidade(pedidoDTO.cidade());
        pedido.setEstado(pedidoDTO.estado());
        pedido.setTransportadora(pedidoDTO.transportadora() != null ? pedidoDTO.transportadora() : "");
        pedido.setFretePreco(pedidoDTO.fretePreco() != null ? pedidoDTO.fretePreco() : "");
        pedido.setNomeCliente(pedidoDTO.nomeCliente());
        pedido.setCpfCliente(pedidoDTO.cpfCliente());
        pedido.setCategoriaGrupo(pedidoDTO.categoriaGrupo());
        pedido.setCategoria(pedidoDTO.categoria() != null ? pedidoDTO.categoria() : "");
        pedido.setPlanilhaVendas(pedidoDTO.planilhaVendas() != null ? pedidoDTO.planilhaVendas() : "");
        pedido.setLicencaGerada(pedidoDTO.licencaGerada() != null ? pedidoDTO.licencaGerada() : 0);
        pedido.setAssinatura(pedidoDTO.assinatura() != null ? pedidoDTO.assinatura() : 0);
        pedido.setChat(pedidoDTO.chat() != null ? pedidoDTO.chat() : 0);
        pedido.setPosVenda(pedidoDTO.posVenda() != null ? pedidoDTO.posVenda() : 0);
        pedido.setNotaFiscal(pedidoDTO.notaFiscal() != null ? pedidoDTO.notaFiscal() : "");
        pedido.setUnidadeNegocio(pedidoDTO.unidadeNegocio() != null ? pedidoDTO.unidadeNegocio() : "");
        pedido.setPrevisaoEntrega(pedidoDTO.previsaoEntrega() != null ? pedidoDTO.previsaoEntrega() : "");
        pedido.setNumeroSerie(pedidoDTO.numeroSerie() != null ? pedidoDTO.numeroSerie() : "");
        pedido.setCodigoRastreio(pedidoDTO.codigoRastreio() != null ? pedidoDTO.codigoRastreio() : "");
        pedido.setObservacoes(pedidoDTO.observacoes() != null ? pedidoDTO.observacoes() : "");
        pedido.setEmailLogin(pedidoDTO.emailLogin() != null ? pedidoDTO.emailLogin() : "");
        return pedido;
    }

}
