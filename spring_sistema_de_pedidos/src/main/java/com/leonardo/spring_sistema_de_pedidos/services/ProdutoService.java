package com.leonardo.spring_sistema_de_pedidos.services;

import java.util.List;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.leonardo.spring_sistema_de_pedidos.dto.ProdutoDTO;
import com.leonardo.spring_sistema_de_pedidos.dto.mapper.ProdutoMapper;
import com.leonardo.spring_sistema_de_pedidos.entities.Produto;
import com.leonardo.spring_sistema_de_pedidos.repositories.ProdutoRepository;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public List<ProdutoDTO> findAll() {
        return ProdutoMapper.toProdutoList(produtoRepository.findAll());
    }

    public List<ProdutoDTO> findByCategoria(Integer categoria) {
        return ProdutoMapper.toProdutoList(produtoRepository.findAllByCategoria(categoria));
    }

    public ProdutoDTO save(ProdutoDTO novoProduto) {
        return ProdutoMapper.toProdutoResponse(produtoRepository.save(ProdutoMapper.toProdutoRequest(novoProduto)));
    }

    public ProdutoDTO update(ProdutoDTO updateProduto, Long id) {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
        modelMapper.getConfiguration().setSkipNullEnabled(true);

        Produto findProduto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado!"));

        ProdutoDTO produtoUpdated = ProdutoMapper.toProdutoResponse(findProduto);
        modelMapper.map(updateProduto, findProduto);
        produtoRepository.save(findProduto);
        return produtoUpdated;
    }
}