package com.leonardo.spring_sistema_de_pedidos.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.lang.NonNull;
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

    @SuppressWarnings("null")
    public ProdutoDTO save(@NonNull ProdutoDTO novoProduto) {
        return ProdutoMapper.toProdutoResponse(produtoRepository.save(ProdutoMapper.toProdutoRequest(novoProduto)));
    }

    @SuppressWarnings("null")
    public ProdutoDTO update(@NonNull ProdutoDTO updateProduto, @NonNull Long id) {
        ModelMapper modelMapper = new ModelMapper();

        Produto findProduto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado!"));

        ProdutoDTO produtoUpdated = ProdutoMapper.toProdutoResponse(findProduto);
        modelMapper.map(updateProduto, findProduto);
        produtoRepository.save(findProduto);
        return produtoUpdated;
    }

    @SuppressWarnings("null")
    public ProdutoDTO remove(@NonNull Long id) {
        Produto findProduto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado!"));

        ProdutoDTO produtoDeletado = ProdutoMapper.toProdutoResponse(findProduto);
        produtoRepository.delete(findProduto);
        return produtoDeletado;
    }
}
