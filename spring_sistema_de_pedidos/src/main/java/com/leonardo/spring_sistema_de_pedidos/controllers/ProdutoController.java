package com.leonardo.spring_sistema_de_pedidos.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.leonardo.spring_sistema_de_pedidos.dto.ProdutoDTO;
import com.leonardo.spring_sistema_de_pedidos.services.ProdutoService;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1")
public class ProdutoController {

    public final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping("/buscar-produtos")
    public ResponseEntity<List<ProdutoDTO>> findAll() {
        List<ProdutoDTO> produtos = produtoService.findAll();
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/buscar-produto-por-categoria")
    public ResponseEntity<List<ProdutoDTO>> findByCategoria(@RequestParam(name = "categoria") Integer categoria) {
        try {
            List<ProdutoDTO> produtos = produtoService.findByCategoria(categoria);
            return ResponseEntity.ok(produtos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/inserir-produto")
    public ResponseEntity<ProdutoDTO> save(@RequestBody @NonNull ProdutoDTO novoProduto) {
        ProdutoDTO produto = produtoService.save(novoProduto);
        return ResponseEntity.status(HttpStatus.CREATED).body(produto);
    }

    @PostMapping("/editar-produto/{id}")
    public ResponseEntity<ProdutoDTO> update(@RequestBody @NonNull ProdutoDTO updateProduto,
            @PathVariable @NonNull Long id) {
        ProdutoDTO produto = produtoService.update(updateProduto, id);
        return ResponseEntity.ok(produto);
    }

    @PostMapping("/remover-produto/{id}")
    public ResponseEntity<ProdutoDTO> remove(ProdutoDTO deleteProduto,
            @PathVariable @NonNull Long id) {
        return ResponseEntity.ok(produtoService.remove(id));
    }
}
