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
                pedido.getNomeCliente(), pedido.getCpfCliente(), pedido.getCategoriaGrupo(),
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
        pedido.setTelefone2(pedidoDTO.telefone2());
        pedido.setLogradouro(pedidoDTO.logradouro());
        pedido.setNumeroEndereco(pedidoDTO.numeroEndereco());
        pedido.setBairro(pedidoDTO.bairro());
        pedido.setComplemento(pedidoDTO.complemento());
        pedido.setCep(pedidoDTO.cep());
        pedido.setCidade(pedidoDTO.cidade());
        pedido.setEstado(pedidoDTO.estado());
        pedido.setTransportadora(pedidoDTO.transportadora());
        pedido.setFretePreco(pedidoDTO.fretePreco());
        pedido.setNomeCliente(pedidoDTO.nomeCliente());
        pedido.setCpfCliente(pedidoDTO.cpfCliente());
        pedido.setCategoriaGrupo(pedidoDTO.categoriaGrupo());
        pedido.setObservacoes(pedidoDTO.observacoes());
        pedido.setEmailLogin(pedidoDTO.emailLogin());
        return pedido;
    }

}
