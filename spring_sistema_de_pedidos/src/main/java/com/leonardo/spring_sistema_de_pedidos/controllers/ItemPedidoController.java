package com.leonardo.spring_sistema_de_pedidos.controllers;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.leonardo.spring_sistema_de_pedidos.dto.ItemPedidoResponseDTO;
import com.leonardo.spring_sistema_de_pedidos.services.ItemPedidoService;

@RestController
@RequestMapping("/api/v1")
public class ItemPedidoController {

    public final ItemPedidoService itemPedidoService;

    ItemPedidoController(ItemPedidoService itemPedidoService) {
        this.itemPedidoService = itemPedidoService;
    }

    @GetMapping("/buscar-itens")
    public ResponseEntity<List<ItemPedidoResponseDTO>> findAll() {
        try {
            List<ItemPedidoResponseDTO> itens = itemPedidoService.findAll();
            return ResponseEntity.ok(itens);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/buscar-item")
    public ResponseEntity<List<ItemPedidoResponseDTO>> findByChave(@RequestParam(name = "chave") String chave) {
        try {
            List<ItemPedidoResponseDTO> itens = itemPedidoService.findByChave(chave);
            return ResponseEntity.ok(itens);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
