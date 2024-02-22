package com.leonardo.spring_sistema_de_pedidos.dto.mapper;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;

import com.leonardo.spring_sistema_de_pedidos.dto.ProdutoDTO;
import com.leonardo.spring_sistema_de_pedidos.entities.Produto;

public class ProdutoMapper {

    private static final ModelMapper modelMaper = new ModelMapper();

    public static ProdutoDTO toProdutoResponse(Produto produto) {
        return modelMaper.map(produto, ProdutoDTO.class);
    }

    public static List<ProdutoDTO> toProdutoList(List<Produto> produtos) {
        return produtos.stream().map(produto -> toProdutoResponse(produto)).collect(Collectors.toList());
    }

    public static Produto toProdutoRequest(ProdutoDTO produtoDto) {
        return modelMaper.map(produtoDto, Produto.class);
    }

}
