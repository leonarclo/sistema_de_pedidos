package com.leonardo.spring_sistema_de_pedidos.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.leonardo.spring_sistema_de_pedidos.entities.Arquivo;
import com.leonardo.spring_sistema_de_pedidos.repositories.PedidoRepository;
import com.leonardo.spring_sistema_de_pedidos.services.ArquivoService;

@Controller
@RequestMapping("/api/v1")
public class ArquivoController {

    public final ArquivoService arquivoService;
    public final PedidoRepository pedidoRepository;

    public ArquivoController(ArquivoService arquivoService, PedidoRepository pedidoRepository) {
        this.arquivoService = arquivoService;
        this.pedidoRepository = pedidoRepository;
    }

    @GetMapping("/buscar-arquivos")
    public ResponseEntity<List<Arquivo>> findByPedido(@RequestParam(name = "chave") String chave) {
        try {
            List<Arquivo> arquivos = arquivoService.findByPedido(chave);
            return ResponseEntity.ok(arquivos);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }

    }
}
